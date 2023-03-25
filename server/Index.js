import express  from 'express';
import mongoose from 'mongoose';
import dotEnv  from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
dotEnv.config();
const app =express();
import server from "./routes/server.js";



app.use(express.json());
//app.use(express.urlencoded({extended:false}));


mongoose.connect(process.env.MONGO_URI,(err)=>{
    if(err) console.log(err);
    console.log('MONGODB');
});

//middleware
app.use(morgan("dev"));
app.use(cors());

// routes
app.use('/',server);

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log('SERVER =>',PORT);
})