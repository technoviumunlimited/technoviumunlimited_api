const mongoose = require('mongoose');
const mongooosePaginate = require('mongoose-paginate-v2');
const { schema } = require('./Games');

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

levelSchema.plugin(mongooosePaginate);

const Levels = mongoose.model('Levels', levelSchema);

// Levels.paginate(query, options)
//     .then(result => { })
//     .catch(error => { });
Levels.paginate({}, { select: 'game_id level', offset: 3, limit: 2 })
    .then(result => {
        console.log(result);
    });

module.exports = Levels;
// module.exports = mongoose.model("Levels", levelSchema);