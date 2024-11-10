const { CustomDesignRequest } = require('../models');

const createDesignRequest = async (req, res) => {
  try {
    console.log('Received design request');
    const { email } = req.body;
    const picture = req.file ? req.file.buffer : null;
    const userId = req.userId; // Assuming userId is set by the authentication middleware

    if (!email || !picture || !userId) {
      return res.status(400).json({ message: 'Email, picture, and user ID are required' });
    }

    const newRequest = await CustomDesignRequest.create({
      email,
      picture,
      userId // Include userId in the creation
    });

    console.log('Design request created:', newRequest.id);
    res.status(201).json({ message: 'Design request submitted successfully', requestId: newRequest.id });
  } catch (error) {
    console.error('Error creating design request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserDesigns = async (req, res) => {
  try {
    const designs = await CustomDesignRequest.findAll({
      order: [['request_date', 'DESC']]
    });
    res.status(200).json(designs);
  } catch (error) {
    console.error('Error fetching custom designs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getDesignById = async (req, res) => {
  // Implementation will be added later
  res.status(501).json({ message: 'Not implemented yet' });
};

const updateDesign = async (req, res) => {
  // Implementation will be added later
  res.status(501).json({ message: 'Not implemented yet' });
};

const deleteDesign = async (req, res) => {
  // Implementation will be added later
  res.status(501).json({ message: 'Not implemented yet' });
};

module.exports = {
  createDesignRequest,
  getUserDesigns,
  getDesignById,
  updateDesign,
  deleteDesign
};
