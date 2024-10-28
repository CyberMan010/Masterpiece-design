const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const userRouter = require("./routes/userroutes");
const db = require('./models');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const path = require('path');
const multer = require('multer');
const searchRoute = require('./routes/searchroute');
const contactRoutes = require('./routes/contactRoutes'); // Ensure this is a function or a router
const orderRoutes = require('./routes/orderroutes'); // Ensure this import is correct
const bodyParser = require('body-parser');
const customRoutes = require('./routes/customdesignroutes');
// Initialize express app
const app = express();


// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);  // Set security HTTP headers
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(bodyParser.json());

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*');
  }
}));
app.use('/api/search', searchRoute);
app.use('/api/contacts', contactRoutes); // Correct path for contacts
app.use('/users', userRouter); // This sets the base path for user routes
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use('/api/orders', orderRoutes); // Ensure this line is present
app.use('/api/custom', customRoutes); // Ensure this line is present

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});
