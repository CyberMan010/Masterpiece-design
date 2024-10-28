const { CustomDesignRequest } = require('../models');

exports.createDesignRequest = async (req, res) => {
  try {
    console.log('Received design request'); // Debugging line
    const { email } = req.body;
    const picture = req.file ? req.file.buffer : null;

    if (!email || !picture) {
      return res.status(400).json({ message: 'Email and picture are required' });
    }

    const newRequest = await CustomDesignRequest.create({
      email,
      picture
    });

    console.log('Design request created:', newRequest.id); // Debugging line
    res.status(201).json({ message: 'Design request submitted successfully', requestId: newRequest.id });
  } catch (error) {
    console.error('Error creating design request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserDesigns = async (req, res) => {
  // Implementation
};

exports.getDesignById = async (req, res) => {
  // Implementation
};

exports.updateDesign = async (req, res) => {
  // Implementation
};

exports.deleteDesign = async (req, res) => {
  // Implementation
};
