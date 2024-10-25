// ... other imports ...
const productRoutes = require('./routes/productroutes');

// ... other middleware ...

// Use the consolidated product routes
app.use('/api/products', productRoutes);
