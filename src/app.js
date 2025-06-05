import express from "express";
import bodyParser from "body-parser";
import router from "./routes/expressRoutes.js";
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors({
    origin : true,
    credentials : true
}));

app.use('/api', router);

const port = process.env.PORT | 6100
app.listen(port, () => {
    console.log("Port "+port+" is working fine!");
});