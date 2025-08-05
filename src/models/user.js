import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    enum: ["admin ", "user"],
    default: "user"
  },
  userPurchasedCourses: [
    {
      type: mongo.Schema.Types.ObjectId,
      ref: "Courses"
    }
  ]
})

const User = mongoose.model("User" , userSchema);
export default User;