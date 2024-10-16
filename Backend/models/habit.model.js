import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		checkedTime:[
			{
				type: Date,
			},
		],
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Product = mongoose.model("Habit", habitSchema);

export default Product;