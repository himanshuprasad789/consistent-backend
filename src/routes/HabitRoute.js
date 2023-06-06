const express = require('express');
const router=express.Router();
// controllers for different types for requests
// const {createWorkout, getWorkouts, getWorkout,deleteWorkout, updateWorkout}=require('./../controllers/workoutController')
const {getHabits,createHabit, updateHabitStatus,updateHabitColor, deleteHabit, }=require('../controllers/HabitController');
const UserModel = require('../models/UserModel');


router.get('/',getHabits)
router.post('/',createHabit)
router.put('/status',updateHabitStatus)
router.put('/color',updateHabitColor)
router.delete('/',deleteHabit)


// workout router
module.exports=router;