import Pricing from "../models/Pricing.js";

/* ==============================
   🌍 PUBLIC GET (Only Active)
================================= */
export const getPublicPricing = async (req, res) => {
  try {
    const plans = await Pricing.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pricing plans",
    });
  }
};

/* ==============================
   🔐 ADMIN GET ALL
================================= */
export const getAdminPricing = async (req, res) => {
  try {
    const plans = await Pricing.find().sort({ order: 1 });

    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin pricing data",
    });
  }
};

/* ==============================
   CREATE
================================= */
export const createPricing = async (req, res) => {
  try {
    const { title, price, duration, features, isPopular, isActive } =
      req.body;

    if (!title || !price || !duration) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const newPlan = await Pricing.create({
      title,
      price,
      duration,
      features,
      isPopular,
      isActive,
    });

    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create pricing plan",
    });
  }
};

/* ==============================
   UPDATE
================================= */
export const updatePricing = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Pricing.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update pricing",
    });
  }
};

/* ==============================
   DELETE
================================= */
export const deletePricing = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Pricing.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pricing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete pricing",
    });
  }
};

/* ==============================
   REORDER ALL
================================= */
export const reorderPricing = async (req, res) => {
  try {
    const { list } = req.body;

    if (!Array.isArray(list)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reorder data",
      });
    }

    const bulkOps = list.map((item, index) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { order: index },
      },
    }));

    await Pricing.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: "Pricing reordered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reorder pricing",
    });
  }
};
