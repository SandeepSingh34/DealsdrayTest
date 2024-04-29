import express from "express";
import route from "./route/emp.js";
import {join} from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { conn } from "./connection/dbcon.js";

//create express app
const app=express();
// Serve static files from the 'images' folder
app.use('/Public', express.static('Public'));

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cors());


app.use("/api",route);

app.get("/",(req,res)=>{
    res.send("Successfully connected backend")
})

conn();

const port=process.env.port||'5002';
app.listen(port,()=>{
    console.log("server runing on port 'http://localhost:5000'")
})