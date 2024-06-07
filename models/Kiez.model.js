const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// CREATE SCHEMA
const kiezSchema = new Schema({
    kiezName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "http://localhost:5173/src/assets/LocalKiez.png"
        },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Event"
    }]
});

// CREATE MODEL
const Kiez = mongoose.model("Kiez", kiezSchema);

// EXPORT THE MODEL
module.exports = Kiez;