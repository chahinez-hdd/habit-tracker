import express from "express";

import { createHabit, deleteHabit, getHabits, updateHabit } from "../controllers/habit.js";

const router = express.Router();

router.get("/", getHabits);
router.post("/", createHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);

export default router;