const express = require('express');
const Kiez = require('../models/Kiez.model');
const router = express.Router();

// Kiez Routes:

// GET : all Kieze

router.get("/", (req, res) => {
    Kiez.find()
      .then((kiez) => res.status(200).json(kiez))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error , while retreiving the kieze. " , type: err.message })
      );
  });

  // GET : kiez by id

  router.get("/:kiezId", (req, res) => {
    Kiez.findById(req.params.kiezId)
      .then((kiez) =>res.status(200).json(kiez))
      .catch((err) =>
        res.status(404).json({ message: "Error , in retriving a kiez" + err.message })
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
  