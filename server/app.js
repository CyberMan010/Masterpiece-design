const express = require('express');
const searchRoutes = require('./routes/searchroute');

const app = express();

// Other middleware and routes
app.use('/api', searchRoutes);

// Start server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
