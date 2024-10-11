import express  from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

// Route Imports

// Configurations
const app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
dotenv.config();
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/' ,(req ,res)=>{
    res.send("Welcome to Home Route");
})
const port =process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`))