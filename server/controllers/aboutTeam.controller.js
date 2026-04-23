
import AboutTeam from "../models/AboutTeam.js";


/* ADD */
export const addAboutTeam = async (req, res) => {

try {

const { name } = req.body;

if (!name) {

return res.status(400).json({

success: false,
message: "Name is required",

});

}

const data = await AboutTeam.create({

name,

});

res.status(201).json({

success: true,
message: "Member added successfully",
data,

});

}

catch (error) {

res.status(500).json({

success: false,
message: error.message || "Server error",

});

}

};



/* GET ALL */
export const getAboutTeam = async (req, res) => {

try {

const data = await AboutTeam
.find()
.sort({ createdAt: 1 }); 

res.status(200).json({

success: true,
count: data.length,
data,

});

}

catch (error) {

res.status(500).json({

success: false,
message: error.message || "Server error",

});

}

};



/* UPDATE */
export const updateAboutTeam = async (req, res) => {

try {

const { name } = req.body;

const data = await AboutTeam.findById(req.params.id);

if (!data) {

return res.status(404).json({

success: false,
message: "Data not found",

});

}

data.name = name || data.name;

await data.save();

res.status(200).json({

success: true,
message: "Updated successfully",
data,

});

}

catch (error) {

res.status(500).json({

success: false,
message: error.message || "Server error",

});

}

};



/* DELETE */
export const deleteAboutTeam = async (req, res) => {

try {

const data = await AboutTeam.findById(req.params.id);

if (!data) {

return res.status(404).json({

success: false,
message: "Data not found",

});

}

await AboutTeam.findByIdAndDelete(req.params.id);

res.status(200).json({

success: true,
message: "Deleted successfully",

});

}

catch (error) {

res.status(500).json({

success: false,
message: error.message || "Server error",

});

}

};