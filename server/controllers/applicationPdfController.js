import PDFDocument from "pdfkit";
import axios from "axios";
import QRCode from "qrcode";
import Application from "../models/Application.js";

export const downloadApplicationPDF = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "Not found" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${app.userDetails.name}.pdf`
    );

    const doc = new PDFDocument({ margin: 50, size: "A4" });

    doc.pipe(res);

    /* HEADER */
    doc.rect(0, 0, doc.page.width, 90).fill("#0f172a");

    doc.fillColor("white").fontSize(22).text("CADMA CONSULTANCY", 50, 30);
    doc.fontSize(10).text("Professional | Trusted | Reliable", 50, 60);

    doc.moveDown(4);

    /* TITLE */
    doc.fillColor("#111")
      .fontSize(20)
      .text("APPLICATION REPORT", { align: "center" });

    doc.moveDown();

    /* INFO */
    doc.fontSize(12);

    const info = [
      ["Name", app.userDetails.name],
      ["Email", app.userDetails.email],
      ["Phone", app.userDetails.phone],
      ["Address", app.userDetails.address],
      ["Service", app.serviceName],
      ["Status", app.status],
    ];

    info.forEach((row) => {
      doc.text(`${row[0]}: `, { continued: true, width: 150 });
      doc.text(row[1]);
      doc.moveDown(0.5);
    });

    doc.moveDown();

    /* DOCUMENTS */
    doc.fontSize(16).text("Uploaded Documents", { underline: true });
    doc.moveDown();

    for (const file of app.uploadedDocuments) {
      doc.fontSize(12).fillColor("#2563eb").text(file.documentName);

      if (file.fileURL.match(/\.(jpg|jpeg|png|webp)$/i)) {
        try {
          const img = await axios.get(file.fileURL, {
            responseType: "arraybuffer",
          });
          doc.moveDown(0.5);
          doc.image(img.data, { fit: [400, 300], align: "center" });
        } catch {}
      }

      doc.moveDown(2);

      if (doc.y > 700) doc.addPage();
    }

    /* QR */
    const qr = await QRCode.toDataURL(
      `https://yourdomain.com/verify/${app._id}`
    );

    doc.addPage();
    doc.fontSize(16).text("Verification QR", { align: "center" });
    doc.moveDown(2);
    doc.image(qr, 200, 200, { width: 180 });

    doc.moveDown(4);
    doc.fontSize(12).text("Scan to verify authenticity", { align: "center" });

    /* SIGN */
    doc.moveDown(4);
    doc.text("Authorized Signature", { align: "right" });
    doc.text("____________________", { align: "right" });
    doc.text("CADMA Authority", { align: "right" });

    /* FOOTER */
    doc.fontSize(9)
      .fillColor("gray")
      .text(
        `Generated on ${new Date().toLocaleString()} | Ref ID: ${app._id}`,
        50,
        doc.page.height - 50,
        { align: "center" }
      );

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PDF generation failed" });
  }
};
