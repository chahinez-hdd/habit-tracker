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
	const habit = req.body; // user will send this data

	if (!habit.name || !habit.price || !habit.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newHabit = new Habit(habit);

	try {
		await newHabit.save();
		res.status(201).json({ success: true, data: newhabit });
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
		const updatedHabit = await Habit.findByIdAndUpdate(id, habit, { new: true });
		res.status(200).json({ success: true, data: updatedHabit });
	} catch (error) {
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