const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/vehicle-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/vehicles', vehicleRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
