const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config();
const userRouter = require("./routes/userroutes");
const { sequelize } = require('./config/db')


// Initialize express app
const app = express();


// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(helmet());  // Set security HTTP headers
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies


// Routes

app.use('/users', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

})
