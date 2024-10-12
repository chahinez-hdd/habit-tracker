import mongoose from "mongoose";
import Habit from "../models/habit.model.js";

export const getHabits = async (req, res) => {
	try {
		const habits = await Habit.find({});
		res.status(200).json({ success: true, data: habits });
	} catch (error) {
		console.log("error in fetching habits:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createHabit = async (req, res) => {
	const habit = req.body; // Log the received habit
	console.log("Received habit:", habit);
  
	if (!habit.name || !habit.description) {
	  return res.status(400).json({ success: false, message: "Please provide all fields" });
	}
  
	const newHabit = new Habit(habit);
  
	try {
	  await newHabit.save();
	  console.log("Habit saved:", newHabit);
	  res.status(201).json({ success: true, data: newHabit });
	} catch (error) {
	  console.error("Error in Create habit:", error.message);
	  res.status(500).json({ success: false, message: "Server Error" });
	}
  };
  

  export const updateHabit = async (req, res) => {
    const { id } = req.params;
    const habit = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid habit Id" });
    }

    try {
        // Find the habit by ID and update it
        const updatedHabit = await Habit.findByIdAndUpdate(id, habit, { new: true });
        res.status(200).json({ success: true, data: updatedHabit });
    } catch (error) {
        console.error("Error updating habit:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const deleteHabit = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid habit Id" });
	}

	try {
		await Habit.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "habit deleted" });
	} catch (error) {
		console.log("error in deleting habit:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const getHabit = async (req, res) => {
    const { id } = req.params;
    
	try {
        const habit = await Habit.findById(id);

        // Change !Habit to !habit
        if (!habit) {
            return res.status(404).json({ success: false, message: "Habit not found" });
        }

        res.status(200).json({ success: true, data: habit });
    } catch (error) {
        console.error("Error in fetching habits:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
