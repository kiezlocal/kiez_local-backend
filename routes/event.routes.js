const express = require('express');
const router = express.Router();
const Event = require("../models/Event.model");
const Kiez = require('../models/Kiez.model');
const mongoose = require("mongoose");
const { errorHandler } = require('../middleware/jwt.middleware');



// POST /api/events
router.post("/", (req, res, next) => {
    const {name, date, startTime, address, description, image, category, website, kiez: kiezId} = req.body;

    if (!name || !date || !startTime || !address || !description || !kiezId){
        return res.status(400).json({message: "Fields are required."});
    }
    Event.create({name, date, startTime, address, description, image, category, website, kiez: kiezId})
    .then(newEvent => {
        return Kiez.findByIdAndUpdate(kiezId,  { $push: { events: newEvent._id } }, {new: true})
        .then(() => newEvent.populate('kiez'));
    })
    .then(populatedEvent => {
        res.status(201).json(populatedEvent);
    })
    .catch(err => {
        next(err);
        
    });

});

router.get("/", (req, res, next) => {
    let events;

    Event.find()
    .populate('kiez')
    .then(eventsFromDB => {
        console.log('Events from DB:', eventsFromDB);
        if (!eventsFromDB) {
            throw new Error("No events found");
        }
        events = eventsFromDB;
        return Kiez.find();
    })
    .then(kiezFromDB => {
        console.log('Kiez from DB:', kiezFromDB);
        if (!kiezFromDB) {
            throw new Error("No kiez found");
        }


        res.json(events);
        return;

        const eventsUpdated = events.map(event => {
            const eventKiez = kiezFromDB.find(k => k._id && event.kiez && k._id.toString() === event.kiez.toString());
            console.log('Event Kiez:', eventKiez);
            return { ...event.toObject(), kiez: eventKiez ? eventKiez.kiez : "Unknown Kiez" };
        });
        res.status(200).json(eventsUpdated);
    })
    .catch((err) => {
        console.error('Error while retrieving events:', err);
        res.status(500).json({ message: "Error while retrieving events.", type: err.message });
    });
})
//GET all Events

// router.get("/", async (req, res, next) => {
//     try {
//         const events = await Event.find().populate('kiez');  // Populate the kiez field
//         res.status(200).json(events);
//     } catch (err) {
//         res.status(500).json({ message: "Error while retrieving events.", type: err.message });
//     }
// });


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

// GET: event by Id
router.get("/:eventId", async (req, res) => {
    const { eventId } = req.params;
    // Event.findById(req.params.eventId)
    // .populate('kiez')

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid." });
        return;
    }

    try {
        const event = await Event.findById(eventId).populate('kiez');
        if (!event) {
            res.status(404).json({ message: "Event not found." });
            return;
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: "Error while retrieving event.", type: err.message });
    }
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



