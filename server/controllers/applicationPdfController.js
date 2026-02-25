
import axios from "axios";

export const downloadApprovedPDF = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id);

  if (!app || !app.pdfUrl) {
    return res.status(404).json({ message: "PDF not found" });
  }

  if (app.status !== "Approved") {
    return res.status(403).json({
      message: "Only Approved applications can download PDF",
    });
  }

  const response = await axios.get(app.pdfUrl, {
    responseType: "arraybuffer",
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="application-${app._id}.pdf"`
  );

  res.send(response.data);
});






