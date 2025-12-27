import MaintenanceRequest from '../models/maintenanceRequest.js';

export const createMaintenanceRequest = async (req, res) => {
  try {
    const { subject, status, equipment, maintenanceType, duration, scheduledDate } = req.body;

    const newRequest = new MaintenanceRequest({
      subject,
      status,
      equipment,
      maintenanceType,
      duration,
      scheduledDate
    });

    await newRequest.save();

    res.status(201).json({ message: 'Maintenance request created successfully', request: newRequest });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    console.error('Error creating maintenance request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};