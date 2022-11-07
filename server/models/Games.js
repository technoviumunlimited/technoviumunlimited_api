const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    id: {
		type: String,
		required: true,
	},
    name: {
		type: String,
		required: true,
	},
    category: {
		type: String,
		required: true,
	},
    created: {
		type: String,
		required: true,
	},
    created_by: {
		type: String,
		required: true,
	},
    description: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Games", gameSchema);
