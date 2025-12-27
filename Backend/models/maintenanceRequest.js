import mongoose from "mongoose"

const MaintenanceRequestSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['New Request', 'In Progress', 'Repaired', 'Scrap'],
    default: 'New Request',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  equipment: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true,
    },
    serialNumber: String, // Storing for quick read, though it exists in Equipment model
    category: String,
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  maintenanceType: {
    type: String,
    enum: ['Corrective', 'Preventive'],
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  scheduledDate: {
    type: Date,
  },
  duration: {
    type: Number, // Storing in hours as per UI
    default: 0,
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High', 'Urgent'],
    default: 'Normal',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  notes: {
    type: String,
    trim: true,
  },
  instructions: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true // Gives you createdAt and updatedAt automatically
});

// Indexing for performance (Essential for SDE roles)
MaintenanceRequestSchema.index({ status: 1, priority: 1 });
MaintenanceRequestSchema.index({ 'equipment.id': 1 });

const MaintenanceRequest = mongoose.models.MaintenanceRequest || mongoose.model('MaintenanceRequest', maintenanceRequestSchema) 
export default MaintenanceRequest; 