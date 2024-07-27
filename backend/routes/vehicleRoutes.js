const express = require('express');
const Vehicle = require('../models/vehicle');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newVehicle = new Vehicle({ name });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Vehicle.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
