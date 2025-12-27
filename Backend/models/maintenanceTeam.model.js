import mongoose, {Schema} from "mongoose";

const maintenanceTeamSchema = new Schema ({
    category:{
        type: Schema.Types.ObjectId,
        required:True
    }

},{timestamps:false})

const MaintenanceTeam = mongoose.models.MaintenanceTeam || mongoose.model('MaintenanceTeam', maintenanceTeamSchema) 
export default MaintenanceTeam;