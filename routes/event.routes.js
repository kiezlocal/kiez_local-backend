const express = require('express');
const router = express.Router();
const Event = require("../models/Event.model");
const Kiez = require('../models/Kiez.model');
const mongoose = require("mongoose");
const { errorHandler } = require('../middleware/jwt.middleware');



// POST /api/events
router.post("/", (req, res, next) => {
    const {name, date, address, description, image, category, kiez: kiezId} = req.body;

    if (!name || !date || !address || !description || !kiezId){
        return res.status(400).json({message: "Fields are required."});
    }
    Event.create({name, date, address, description, image, category, kiez: kiezId})
    .then(newEvent => {
        return Kiez.findByIdAndUpdate(kiezId,  { $push: { events: newEvent._id } }, {new: true})
    })
    .then( response => {
        res.status(201).json(response);
    })
    .catch(err => {
        next(err);
        
    });

});
//GET all Events

router.get("/", (req, res, next) => {
    Event.find()
    .then((event) => res.status(200).json(event))
    .catch((err) => {
        res.status(500).json({message: "Error while retreiving events.", type: err.message})
    });
});

// router.get("/", (req, res, next) => {
//     Event.find()
//     .then(eventsFromDB => {
//         events = eventsFromDB;
//         return Kiez.find()
//     })
//     .then(kiezFromDB => {
//         const eventsUpdated = events.map(event => {
//             const eventKiez = kiezFromDB.find(k => k._id.toString() === event.kiez.toString());
//             return {...event.toObject(), kiezName: eventKiez ? eventKiez.kiezName : "Unknown Kiez"};

//         });
//         res.status(200).json(eventsUpdated);
//     })
//     .catch((err) => {
//         res.status(500).json({message: "Error while retreiving events.", type: err.message})
// })

// });
// UPDATE: event by Id

router.put("/:eventId", (req, res) =>{
    const {eventId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid." });
        return;
    }

    Event.findByIdAndUpdate(eventId, req.body, {new:true})
    .then((updatedEvent) => res.json(updatedEvent))
    .catch(err => {
       nest(err);
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
    .then(event => {
        if (!event) {
            const error = new Error(`Event with ID ${eventId} not found.`);
            error.status = 404;
            throw error;
        }
        res.json({message: `Event with ${eventId} was removed successfully.`});
    })
    .catch(err => {
        next(err);
});
});
router.use(errorHandler);

module.exports = router;



