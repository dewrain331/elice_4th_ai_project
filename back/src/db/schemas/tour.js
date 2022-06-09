import pkg from "mongoose";
const { Schema, model } = pkg;

const TourSchema = new Schema({
	id: {
		type: String,
		unique: true,
		index: true,
	},
	krTitle: {
		type: String,
		index: true,
	},
	address: {
		type: String,
		index: true,
	},
	description: {
		type: String,
		index: true,
	},
	image: {
		type: String,
		index: true,
	},
	phoneNo: {
		type: String,
		index: true,
	},
	likeCount: {
		type: Number,
		default: 0,
		index: true,
	},
	likedUsers: {
		type: Array,
		default: [],
		index: true,
	},
	phoneNo: {
		type: String,
		index: true,
	},
});

export const Tour = model("Tour", TourSchema);
