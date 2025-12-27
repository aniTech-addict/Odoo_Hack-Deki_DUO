import mongoose, { Schema } from "mongoose";
import MaintenanceTeam from '../models/maintenanceTeam.model.js';
const equipmentSchema = new Schema({

name:{
    type:String,
    required: true
},

serial_number:{
    type:String,
    required:true
},

category:{
    type:String,
    enum:["machine","vehicle","IT"]
}, 

department:{
    type:String
},

assigned_employee_id:{
    type: Schema.Types.ObjectId,
    ref:'User',
    default:None
},

maintenance_team_id:{
    type: Schema.Types.ObjectId,
    ref: 'Maintenance_Team',
},

purchase_date:{
    type:Date,
    required:true
},

warranty_expiry:{
    type:Date
},

location:{
    type:String
},

is_scrapped:{
    type:Boolean
}
},{timestamps:true})

const Equipment = mongoose.models.Equipment || mongoose.model("Equipment", equipmentSchema);
export default Equipment;