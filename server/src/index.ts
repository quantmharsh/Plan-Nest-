import express  from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import searchRoutes from "./routes/searchRoutes";
import userRoutes from "./routes/userRoutes";
import teamRoutes from "./routes/teamRoutes";
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
app.use('/projects',projectRoutes);
app.use("/tasks" , taskRoutes);
app.use("/search" ,searchRoutes);
app.use("/users",userRoutes);
app.use("/teams", teamRoutes);
//Converting to Number  to get rid of typescript error because using AWS for deployment 
const port =Number(process.env.PORT) || 3000;
//0.0.0.0 is to solve EC2 network   issue. 
app.listen(port,"0.0.0.0", () => console.log(`Server started on port ${port}`)) ;