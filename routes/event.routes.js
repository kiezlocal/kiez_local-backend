const express = require('express');
const router = express.Router();
const Event = require("../models/Event.model");
const Kiez = require('../models/Kiez.model');


// POST /api/events
router.post("/events", (req, res) => {
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

module.exports = router;



