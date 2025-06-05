import { siteMail } from "../Controllers/mailingController.js";
import express from 'express';

const router = express.Router();

router.post('/sendMail', siteMail);

export default router;
