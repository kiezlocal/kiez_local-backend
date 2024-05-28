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
        default: "https://www.visitberlin.de/system/files/styles/visitberlin_bleed_header_visitberlin_mobile_1x/private/image/kollwitzkiez26_c_visitBerlin_Foto_Dagmar_Schwelle_DL_PPT_0.jpg"
    },
    events: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Events"
    }
});

// CREATE MODEL
const Kiez = mongoose.model("Kiez", kiezSchema);

// EXPORT THE MODEL
module.exports = Kiez;