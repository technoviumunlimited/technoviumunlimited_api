const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    game_id: {
        type: String,
        required: true
    },

    level: {
        type: Number,
        required: true
    },

    created: {
        type: Date,
        default: Date.now,
        required: true
    },

    created_by: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Levels", levelSchema);