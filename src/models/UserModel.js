const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    habits: [{ type: mongoose.Types.ObjectId, ref: "Habit",default:[] }],
  },
  { timestamps: true }
);
// timestamps enable createdAt and updatedAt property to each Applicant document on DB

// exporting model created with Applicant Schema
module.exports = mongoose.model("User", UserSchema);
