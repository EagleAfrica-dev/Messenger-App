import express from "express";
import bodyParser from "body-parser";
import router from "./routes/expressRoutes.js";
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const limiter = rateLimit({
    windowMs : 1 * 60 * 1000,
    max : 3,
    message : {
        status : 429,
        error : 'Too many requests. Please try again later.'
    }
})

app.use(cors({
    origin : true,
    credentials : true
}));

app.use('/api',limiter, router);

const port = process.env.PORT | 6100
app.listen(port, () => {
    console.log("Port "+port+" is working fine!");
});