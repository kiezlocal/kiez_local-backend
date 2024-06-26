const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");


const eventSchema = new Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required."],
        },
        date:{
            type: Date,
            required: [true, "Date is required."],
        },
        startTime: {
            type: String, 
            required: [true, "Start time is required."],
        },
        address:{
            type: String,
            required: [true, "Address is required."],
        },
        description:{
            type: String,
            required: [true, "Description is required."],
        },
        image:{
            type: String, 
            default: "http://localhost:5173/src/assets/LocalKiez.png"
        },
        category:{
            type: String,
            enum: ['Music', 'Art', 'Local markets', 'Sport', 'Food&drinks', 'Events for kids', 'Tours', 'Social gatherings', 'Other'],
            required: [true, "Category is required."],
        },
        kiez: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Kiez',
            required: [true, "Kiez is required."]
        },
        website: {
            type: String,
        },
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;