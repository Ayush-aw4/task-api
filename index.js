require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require("./routes/auth.routes");



const app = express();

// Middleware
app.use(express.json());
app.use("/auth", authRoutes);
// Connect to DB
connectDB();

// Routes
app.use('/tasks', require('./routes/task.routes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});