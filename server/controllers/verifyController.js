import Application from "../models/Application.js";

export const verifyApplication = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);

    if (!app)
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });

    res.json({
      success: true,
      data: {
        id: app._id,
        name: app.userDetails.name,
        service: app.serviceName,
        status: app.status,
        submitted: app.createdAt,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};