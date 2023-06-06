const mongoose = require("mongoose");
const UserModel = require("./UserModel");
// const UserModel = require("../models/UserModel");

const HabitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      
    },
    completed: {
      type: Map,
      of: String,
      default:new Map()
    } ,
   
  },
  { timestamps: true }
);
// HabitSchema.pre("remove", async function (next) {
//   try {
//      // Import the User model
//     await UserModel.updateMany(
//       { habits: this._id },
//       { $pull: { habits: this._id } }
//     );
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = mongoose.model("Habit", HabitSchema);
