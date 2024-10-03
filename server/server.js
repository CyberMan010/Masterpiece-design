const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config();
const userRouter = require("./routes/userroutes");
const { sequelize } = require('./models')
const productRoutes = require("./routes/productroutes")
const categoryRoutes = require("./routes/categoryroutes")

// Initialize express app
const app = express();


// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(helmet());  // Set security HTTP headers
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies


// Routes
app.use('/users', userRouter)
app.use("/api", productRoutes)
app.use("/api/categories", categoryRoutes)
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every app start
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });
