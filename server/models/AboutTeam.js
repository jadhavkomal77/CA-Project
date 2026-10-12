import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    columnIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 2, // Matches your 3 columns (0, 1, 2)
    },
    name: {
      type: String,
      required: [true, "Team member name is required"],
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      type: Number,
      default: 0, // To sort members within a column if needed
    },
  },
  { timestamps: true }
);

const AboutTeam = mongoose.model("AboutTeam", teamMemberSchema);

export default AboutTeam;