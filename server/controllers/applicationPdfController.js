// import PDFDocument from "pdfkit";
// import axios from "axios";
// import QRCode from "qrcode";
// import Application from "../models/Application.js";

// export const downloadApplicationPDF = async (req, res) => {
//   try {
//     const app = await Application.findById(req.params.id);
//     if (!app) return res.status(404).json({ message: "Not found" });

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=${app.userDetails.name}.pdf`
//     );

//     const doc = new PDFDocument({ margin: 50, size: "A4" });

//     doc.pipe(res);

//     /* HEADER */
//     doc.rect(0, 0, doc.page.width, 90).fill("#0f172a");

//     doc.fillColor("white").fontSize(22).text("CADMA CONSULTANCY", 50, 30);
//     doc.fontSize(10).text("Professional | Trusted | Reliable", 50, 60);

//     doc.moveDown(4);

//     /* TITLE */
//     doc.fillColor("#111")
//       .fontSize(20)
//       .text("APPLICATION REPORT", { align: "center" });

//     doc.moveDown();

//     /* INFO */
//     doc.fontSize(12);

//     const info = [
//       ["Name", app.userDetails.name],
//       ["Email", app.userDetails.email],
//       ["Phone", app.userDetails.phone],
//       ["Address", app.userDetails.address],
//       ["Service", app.serviceName],
//       ["Status", app.status],
//     ];

//     info.forEach((row) => {
//       doc.text(`${row[0]}: `, { continued: true, width: 150 });
//       doc.text(row[1]);
//       doc.moveDown(0.5);
//     });

//     doc.moveDown();

//     /* DOCUMENTS */
//     doc.fontSize(16).text("Uploaded Documents", { underline: true });
//     doc.moveDown();

//     for (const file of app.uploadedDocuments) {
//       doc.fontSize(12).fillColor("#2563eb").text(file.documentName);

//       if (file.fileURL.match(/\.(jpg|jpeg|png|webp)$/i)) {
//         try {
//           const img = await axios.get(file.fileURL, {
//             responseType: "arraybuffer",
//           });
//           doc.moveDown(0.5);
//           doc.image(img.data, { fit: [400, 300], align: "center" });
//         } catch {}
//       }

//       doc.moveDown(2);

//       if (doc.y > 700) doc.addPage();
//     }

//     /* QR */
//     const qr = await QRCode.toDataURL(
//       `https://www.cadmaassociatespvtltd.com//verify/${app._id}`
//     );

//     doc.addPage();
//     doc.fontSize(16).text("Verification QR", { align: "center" });
//     doc.moveDown(2);
//     doc.image(qr, 200, 200, { width: 180 });

//     doc.moveDown(4);
//     doc.fontSize(12).text("Scan to verify authenticity", { align: "center" });

//     /* SIGN */
//     doc.moveDown(4);
//     doc.text("Authorized Signature", { align: "right" });
//     doc.text("____________________", { align: "right" });
//     doc.text("CADMA Authority", { align: "right" });

//     /* FOOTER */
//     doc.fontSize(9)
//       .fillColor("gray")
//       .text(
//         `Generated on ${new Date().toLocaleString()} | Ref ID: ${app._id}`,
//         50,
//         doc.page.height - 50,
//         { align: "center" }
//       );

//     doc.end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "PDF generation failed" });
//   }
// };





import PDFDocument from "pdfkit";
import axios from "axios";
import QRCode from "qrcode";
import Application from "../models/Application.js";

export const downloadApplicationPDF = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);

    if (!app)
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });

    /* HEADERS */
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${app.userDetails.name}.pdf`
    );

    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    doc.pipe(res);

    /* HEADER BAR */
    doc.rect(0, 0, doc.page.width, 90).fill("#0f172a");

    doc
      .fillColor("white")
      .fontSize(22)
      .text("CADMA CONSULTANCY", 50, 30);

    doc
      .fontSize(10)
      .text("Professional | Trusted | Reliable", 50, 60);

    doc.moveDown(4);

    /* TITLE */
    doc
      .fillColor("#111")
      .fontSize(20)
      .text("APPLICATION REPORT", { align: "center" });

    doc.moveDown(1.5);

    /* USER DETAILS */
    const info = [
      ["Name", app.userDetails.name],
      ["Email", app.userDetails.email],
      ["Phone", app.userDetails.phone],
      ["Address", app.userDetails.address || "-"],
      ["Service", app.serviceName],
      ["Status", app.status],
    ];

    info.forEach(([label, value]) => {
      doc.font("Helvetica-Bold").text(label + ": ", { continued: true });
      doc.font("Helvetica").text(value || "-");
      doc.moveDown(0.5);
    });

    doc.moveDown();

    /* DOCUMENT TITLE */
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#111")
      .text("Uploaded Documents", { underline: true });

    doc.moveDown();

    /* FILE LOOP */
    for (const file of app.uploadedDocuments) {
      if (doc.y > 700) doc.addPage();

      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#2563eb")
        .text(file.documentName);

      doc.moveDown(0.5);

      /* IMAGE PREVIEW */
      if (file.fileURL.match(/\.(jpg|jpeg|png|webp)$/i)) {
        try {
          const img = await axios.get(file.fileURL, {
            responseType: "arraybuffer",
          });

          const buffer = Buffer.from(img.data);

          const imgHeight = 300;

          /* PAGE BREAK CHECK */
          if (doc.y + imgHeight > doc.page.height - 80) {
            doc.addPage();
          }

          doc.image(buffer, {
            fit: [400, 300],
            align: "center",
          });
        } catch (err) {
          console.log("Image load error:", err.message);
        }
      }

      doc.moveDown(2);
    }

    /* QR PAGE */
    const qr = await QRCode.toDataURL(
      `https://www.cadmaassociatespvtltd.com/verify/${app._id}`
    );

    doc.addPage();

    doc
      .fontSize(16)
      .fillColor("#111")
      .text("Verification QR", { align: "center" });

    doc.moveDown(2);

    doc.image(qr, doc.page.width / 2 - 90, 200, {
      width: 180,
    });

    doc.moveDown(4);

    doc
      .fontSize(12)
      .text("Scan to verify authenticity", { align: "center" });

    /* SIGNATURE */
    doc.moveDown(4);
    doc.text("Authorized Signature", { align: "right" });
    doc.text("____________________", { align: "right" });
    doc.text("CADMA Authority", { align: "right" });

    /* FOOTER */
    doc
      .fontSize(9)
      .fillColor("gray")
      .text(
        `Generated on ${new Date().toLocaleString()} | Ref ID: ${app._id}`,
        50,
        doc.page.height - 50,
        { align: "center" }
      );

    doc.end();
  } catch (error) {
    console.error("PDF ERROR:", error);
    res.status(500).json({
      success: false,
      message: "PDF generation failed",
    });
  }
};