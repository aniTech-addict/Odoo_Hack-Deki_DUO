import mongoose from "mongoose"
const Schema = mongoose.Schema;

const maintenanceRequestSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['corrective', 'preventive'],
        required: true
    },
    equipment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true
    },
    maintenance_team_id: {
        type: Schema.Types.ObjectId,
        ref: 'MaintenanceTeam',
        required: true
    },
    assigned_to_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    status: {
        type: String,
        enum: ['new', 'in_progress', 'repaired', 'scrap'],
        default: 'new'
    },
    scheduled_date: {
        type: Date,
        required: function() {
            return this.type === 'preventive';
        }
    },
    duration_hours: {
        type: Number,
        min: 0,
        required: false
    },
    created_by_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true 
})

const MaintenanceRequest = mongoose.models.MaintenanceRequest || mongoose.model('MaintenanceRequest', maintenanceRequestSchema) 
export default MaintenanceRequest; 