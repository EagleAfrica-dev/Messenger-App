import { siteMail } from "../Controllers/mailingController.js";
import { verifyCAPTCHA } from "../Controllers/reCAPTCHAController.js";
import express from 'express';

const router = express.Router();

router.post('/sendMail', verifyCAPTCHA, siteMail);

export default router;
