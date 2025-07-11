import axios from 'axios';

export const verifyCAPTCHA = async(req, res, next) => {
    const token = req.body['g-recaptcha-response']
    const secretKey = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'

    if(!token){
        return res.status(400).json({error : 'reCAPTCHA token missing!'});
    }

    try{
        const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,    
        {},
    {
        params : {
            secret : secretKey,
            response : token
        }
    });

    const data = response.data;
    if(data.success){
        next();
    }
    else{
        res.status(403).json({error : 'reCAPTCHA Verification Failed!'});
    }
    }
    catch{
        res.status(500).json({
            error : 'Failed connection to reCAPTCHA endpoint!'
        });
    }
}