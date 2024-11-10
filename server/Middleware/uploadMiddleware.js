const multer = require('multer');

// Configure multer storage
const storage = multer.memoryStorage(); // Store files in memory as Buffer objects

const upload = multer({ storage });

module.exports = upload;
