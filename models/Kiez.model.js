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
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQItGh26Ag_CQP6lMh3Sf1QxRDuu1bqs3G6ww&s"
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