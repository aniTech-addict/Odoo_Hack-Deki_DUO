import mongoose, {Schema} from "mongoose"
import User from "./user.model.js"
import MaintenanceTeam from "./maintenanceTeam.model.js"

const teamSchema = new Schema({

    team_id:{
        type:Schema.Types.ObjectId,
        ref:MaintenanceTeam
    },

    user_id:{
        type:Schema.Types.ObjectId,
        ref:User
    }
},{timestamps:false})

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
export default Team;