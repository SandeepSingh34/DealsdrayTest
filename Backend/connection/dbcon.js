import mongoose from "mongoose";

let conn = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/DealsDray");
        console.log("Connected Successfully");
    }
    catch (e) {
        console.log("Connection faild");
    }

}

// create schema for Create-Employee
let Emp=mongoose.Schema({
    fullName:{type:String},
    email:{type:String},
    mobileNo:{type:Number},
    gender:{type:String},
    course:{type:Array},
    designation:{type:String},
    date:{type:String},
    photo:{type:String}
})

const EmpModel=mongoose.model("Employee",Emp);

export {conn,EmpModel};