require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes.js')
const detectRoutes = require('./routes/detectRoutes.js')

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDB(process.env.MONGO_URI);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patient',patientRoutes );
app.use('/api/detect',detectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
