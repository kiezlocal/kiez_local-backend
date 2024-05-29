const express = require('express');
const router = express.Router();
const Event = require("../models/Event.model");
const Kiez = require('../models/Kiez.model');


router.post("/api/events/addevent", (req, res) => {
    const {name, date, time, address, kiez, description, image, category} = req.body;

    if (!name || !date || !time || !address || !kiez || !description){
        return res.status(400).json({message: "Fields are required."});
    }
    Event.create({name, date, time, address, kiez, description, image, category})
    .then(event => {
        res.status(201).json(event);
    })
    .catch(error => {
        res.status(500).json({message: "Error while creating event", error});
    });

});

module.exports = router;