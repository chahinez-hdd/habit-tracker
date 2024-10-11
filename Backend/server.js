import express from 'express';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import habitsRoutes from './routes/habit.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows us to accept JSON data in the req.body
app.use('/api/habits',habitsRoutes);


app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});