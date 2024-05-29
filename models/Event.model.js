const { Schema, model } = require("mongoose");

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
        time:{
            type: Date,
            required: [true, "Time is required."],
        },
        address:{
            type: String,
            required: [true, "Address is required."],
        },
        kiez:{
            type: mongoose.Schema.Types.ObjectId, ref: "Kiez",
        },
        description:{
            type: String,
            required: [true, "Description is required."],
        },
        image:{
            type: String
        },
        category:{
            type: String,
            enum: ['Music', 'Art', 'Local markets', 'Sport', 'Food&drinks', 'Events for kids', 'Tours', 'Social gatherings', 'Other'],
            required: [true, "Category is required."],
        }
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;