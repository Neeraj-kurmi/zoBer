import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js"
import companyRoutes from "./routes/company.routes.js"
import jobRoute from "./routes/job.routes.js"
import applicationRoute from "./routes/application.routes.js";
import path from 'path'
dotenv.config({});

const app=express();

const _dirname=path.resolve()

//middleware

app.use(express.json());
app.use(express.urlencoded({extended :true}))
app.use(cookieParser());
const corsOptions ={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));
const PORT=process.env.PORT || 3000;

//api 
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/company",companyRoutes);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(_dirname,"Frontend/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"))
})

app.listen(PORT,()=>{
    connectDB();
     console.log(`server running at port ${PORT}`);
})