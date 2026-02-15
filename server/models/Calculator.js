import mongoose from "mongoose";

const CalculatorSchema = new mongoose.Schema({

 name:{ type:String, trim:true },
 email:{ type:String, lowercase:true },
 phone:String,

 type:{
  type:String,
  enum:["gst","tax","fees"],
  required:true
 },

 inputs:{
  type:Object,
  required:true
 },

 result:{
  type:Object,
  required:true
 }

},{ timestamps:true });

export default mongoose.model("Calculator",CalculatorSchema);
