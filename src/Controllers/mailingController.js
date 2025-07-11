
import joi from 'joi';
import nodeMailer from 'nodemailer';
import { JSDOM } from 'jsdom';
import createDomPurify from 'dompurify';
import dotenv from 'dotenv';

dotenv.config();
const window = new JSDOM('').window;
const DOMPurify = createDomPurify(window);

const transit = nodeMailer.createTransport({
    service : 'Gmail',
    auth : {
        user : process.env.EMAIL_BRIDGE,
        pass : process.env.APP_PASSWORD
    }
});

export const siteMail = async(req, res) => {
    let {dropdown, subject, message, userAddress, userPhone} = req.body;

    const finalData = {
        dropdown, subject, message, userAddress, userPhone
    }

    subject = DOMPurify.sanitize(subject);
    message = DOMPurify.sanitize(message);

    const schema = joi.object({
        dropdown : joi.string().required(),
        subject : joi.string().required(),
        message : joi.string().required(),
        userAddress : joi.string().trim().email().required(),
        userPhone : joi.string().min(10).max(13).required()
    });
    const result = schema.validate(finalData);
    if(result.error){
        console.log(result.error.details[0].message);
        res.status(400).json({error : result.error.details[0].message});
    }
    else{

        let targetEmail = process.env.TARGET_EMAIL;
        if(dropdown === "General"){
            subject = "General Insurance: "+subject;
        }
        else if(dropdown === "Medical"){
            subject = "Medical Insurance: "+subject;
        }
        else if(dropdown === "Pensions"){
            subject = "Pension Administration: "+subject;
        }
        else if(dropdown === "Mbao"){
            subject = "Mbao: "+subject;
        }
        else if(dropdown === "Group-life"){
            subject = "Group Life: "+subject;
        }

        message = "Phone Number: "+userPhone+"\n\n"+message

    const mailOptions = {
        from : process.env.EMAIL_BRIDGE,
        to : targetEmail,
        subject : subject,
        text : message,
        replyTo : userAddress
    }
    try{
        const info = transit.sendMail(mailOptions);
        console.log("Message sent successfully : %s", (await info).messageId)
        res.status(200).json({
            message : "Message sent successfully",
            messageId : (await info).messageId
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error : "Error sending mail",
            id : error
        });
    }
}
}




