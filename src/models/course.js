import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName : {
    type : String ,
    required : true ,
  },
  courseDescription : {
    type : String ,
    required : true ,
  },
  coursePrice : {
    type : Number ,
    required : true ,
  },
  courseStarted : {
    type : Boolean,
    default : false ,
  },
  courseContent : {
    type : String ,
    required : true ,
  },
  courseCreatedBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User" ,
    required : true,
  },
  courseCreatedAt : {
    type : Date ,
    default : Date.now(),
  }
})

const Courses = mongoose.model("Courses" , courseSchema);
export default Courses;