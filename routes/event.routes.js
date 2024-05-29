const express = require('express');
const router = express.Router();
const Event = require("../models/Event.model");
const Kiez = require('../models/Kiez.model');
const mongoose = require("mongoose");



// POST /api/events
router.post("/", (req, res) => {
    const {name, date, address, description, image, category, kiez: kiezId} = req.body;

    if (!name || !date || !address || !description || !kiezId){
        return res.status(400).json({message: "Fields are required."});
    }
    Event.create({name, date, address, description, image, category})
    .then(newEvent => {
        return Kiez.findByIdAndUpdate(kiezId,  { $push: { events: newEvent._id } }, {new: true})
    })
    .then( response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({message: "Error while creating event", error});
    });

});
//GET all Events

router.get("/", (req, res) => {
    Event.find()
    .then((event) => res.status(200).json(event))
    .catch((err) => {
        res.status(500).json({message: "Error while retreiving events.", type: err.message})
    });
});

// UPDATE: event by Id

router.put("/:eventId", (req, res) =>{
    const {eventId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid." });
        return;
    }

    Event.findByIdAndUpdate(eventId, req.body, {new:true})
    .then((updatedEvent) => res.json(updatedEvent))
    .catch((err) => {
        console.log("Error while updating the project", err);
      res.status(500).json({ message: "Error while updating the event." });
    });
});

// DELETE: event by Id

router.delete("/:eventId", (req, res) => {
    const {eventId} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(eventId)){
        res.status(400).json({message: "Specified id is not valid."});
        return;
    }

    Event.findByIdAndDelete(eventId)
    .then(() => 
        res.json({message: `Event with ${eventId} was removed successfully.`})
    )
    .catch((err) => {
        console.log("Error while deleting the event", err);
        res.status(500).json({ message: "Error while deleting the event" });
});
});

module.exports = router;



