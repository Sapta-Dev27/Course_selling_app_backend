import mongoose from 'mongoose';

const purchasedCoursesSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User" ,
    required : true 
  } ,
  courseId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Courses" ,
    required : true 
  },
  purchasedAt : {
    type : Date ,
    default : Date.now()
  }

})

const PurchasedCourses = mongoose.model("PurchasedCourses" , purchasedCoursesSchema);
export default PurchasedCourses;