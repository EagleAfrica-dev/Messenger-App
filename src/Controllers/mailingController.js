
import joi from 'joi';
import nodeMailer from 'nodemailer';

const transit = nodeMailer.createTransport({
    service : 'Gmail',
    auth : {
        user : 'ondiekidaystar@gmail.com',
        pass : 'zcnp scxc hlcv pdif'
    }
});

export const siteMail = async(req, res) => {
    const {dropdown, subject, message, userAddress} = req.body;

    const schema = joi.object({
        dropdown : joi.string().required(),
        subject : joi.string().required(),
        message : joi.string().min(50).required(),
        userAddress : joi.string().trim().email().required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        console.log(result.error.details[0].message);
        res.status(400).json({error : result.error.details[0].message});
    }
    else{

        let targetEmail;
        if(dropdown === "General"){
            targetEmail = "egetange@eagleafrica.co.ke";
        }
        else if(dropdown === "Medical"){
            targetEmail = "dmwasambo@eagleafrica.co.ke";
        }
        else if(dropdown === "Pensions"){
            targetEmail = ""
        }

    const mailOptions = {
        from : 'ondiekidaystar@gmail.com',
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




