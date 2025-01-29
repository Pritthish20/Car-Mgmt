import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors";



//flies
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js'
import carRoute from './routes/carRoute.js'
import uploadRoute from './routes/uploadRoute.js'


//configuration
dotenv.config();
connectDB();

const app=express();

app.get("/", (req, res) => {
  res.send("server is up!!!");
});


//middleware

app.use(
    cors({
      origin: ["", "http://localhost:5173"], 
      credentials: true,
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

const port=process.env.PORT || 3000;
//console.log(process.env.PORT);

//routes

app.use("/api/v1/user",userRoute);
app.use("/api/v1/cars",carRoute);
app.use("/api/v1/upload",uploadRoute);




app.listen(port,()=>console.log(`server listening on port ${port}`));