const express = require('express');
const Kiez = require('../models/Kiez.model');
const router = express.Router();

// Kiez Routes:

// GET : all Kieze

router.get("/", (req, res, next) => {
  Kiez.find()
      .populate('events')  // This populates the events field with event data
      .then(kiezList => res.status(200).json(kiezList))
      .catch(err => {
          res.status(500).json({ message: "Error while retrieving kiez information.", type: err.message });
      });
});

  // GET : kiez by id
router.get("/:kiezId", (req, res) => {
  Kiez.findById(req.params.kiezId)
      .then((kiez) => res.status(200).json(kiez))
      .catch((err) =>
          res.status(404).json({ message: "Error in retrieving a kiez" + err.message })
      );
});

// PUT : update kiez
router.put('/:kiezId', async (req, res) => {
  try {
      const updatedKiez = await Kiez.findByIdAndUpdate(req.params.kiezId, req.body, { new: true });
      res.status(200).json(updatedKiez);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
  
  module.exports = router;
  