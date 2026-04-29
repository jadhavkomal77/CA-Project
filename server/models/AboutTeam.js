
import mongoose from "mongoose";

const aboutTeamSchema = new mongoose.Schema(

{

name: {
type: String,
required: true,
trim: true,
},

},

{ timestamps: true }

);

const AboutTeam = mongoose.model("AboutTeam", aboutTeamSchema);

export default AboutTeam;