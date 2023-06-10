const mongoose = require("mongoose");

const HabitModel = require("../models/HabitModel");
const UserModel = require("../models/UserModel");
// get all Habits
const getHabits = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await UserModel.findById(userId).populate("habits");
    if (user === null) res.status(200).json([]);
    const populatedHabits = user.habits;
    console.log(populatedHabits);
    res.status(200).json(populatedHabits);
  } catch (err) {
    console.log(err);
    res.json({err});
  }
};

// post a workout
const createHabit = async (req, res) => {
  const userId = req.userId;
  try {
    const Habit = await HabitModel.create({
      ...req.body,
    });
    const habitId = Habit._id;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { habits: habitId } },
      { new: true }
      );
      console.log(Habit,updatedUser)
      console.log(Habit, updatedUser);
    res.status(200).json(Habit);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const updateHabitStatus = async (req, res) => {
  const { habitId, date, value } = req.body;
  console.log(req.body);
  try {
    if (value === null) {
      const dateStr = `completed.${date}`; 
      
      const updatedHabit = await HabitModel.updateOne(
        { name: "dance" },
        { $unset: { [dateStr]: "" } }
      );
      console.log(dateStr);

      console.log("updatedhabit", updatedHabit);
      res.status(200).json({ [date]: null });
    } else {
      const updatedHabit = await HabitModel.findByIdAndUpdate(
        { _id: habitId },
        { $set: { [`completed.${date}`]: value } },
        { new: true }
      );
      console.log(updatedHabit.completed);
      res.status(200).json({ [date]: updatedHabit.completed.get(date) });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const updateHabitColor=async(req,res)=>{
    const {habitId,color}=req.body
    try{
      const updatedHabit=await HabitModel.findByIdAndUpdate(
        habitId,
        {$set:{color:color}},
        { new: true }

      )
      res.status(200).json({color:color})
    }catch(err){
      console.log(err)
      res.json(err)
    }
}

const deleteHabit = async (req, res) => {
  const userId = req.userId;
  const { habitId } = req.body;
  console.log(userId,habitId)
  
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { habits: habitId } },
      { new: true }
    );

    const habit = await HabitModel.findByIdAndRemove(habitId);
    console.log(updatedHabit,habit)
    res.json({ updatedUser,habit });
  } catch (err) {
    console.log(err);
    res.json({  err});
  }
};

module.exports = { getHabits, createHabit, updateHabitStatus,updateHabitColor, deleteHabit };
