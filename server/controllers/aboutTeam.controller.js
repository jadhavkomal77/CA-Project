import AboutTeam from "../models/AboutTeam.js";

export const getTeamMembers = async (req, res) => {
  try {
    const members = await AboutTeam.find().sort({ columnIndex: 1, order: 1 });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addTeamMember = async (req, res) => {
  try {
    const { columnIndex, name, designation, order } = req.body;

    if (columnIndex === undefined || !name) {
      return res.status(400).json({ success: false, message: "Column index and name are required" });
    }

    const newMember = await AboutTeam.create({
      columnIndex,
      name,
      designation,
      order: order || 0,
    });

    res.status(201).json({ success: true, message: "Team member added successfully", data: newMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { columnIndex, name, designation, order } = req.body;

    const updatedMember = await AboutTeam.findByIdAndUpdate(
      id,
      { columnIndex, name, designation, order },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    res.status(200).json({ success: true, message: "Team member updated successfully", data: updatedMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await AboutTeam.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    res.status(200).json({ success: true, message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};