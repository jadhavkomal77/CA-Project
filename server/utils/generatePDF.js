
// import { PDFDocument } from "pdf-lib";
// import axios from "axios";
// import PDFKit from "pdfkit";

// export default async function generatePDFBuffer(app) {

//   const pdfDoc = await PDFDocument.create();

//   const kitDoc = new PDFKit({ margin: 40 });
//   const buffers = [];

//   kitDoc.on("data", buffers.push.bind(buffers));

//   const kitPromise = new Promise((resolve) => {
//     kitDoc.on("end", resolve);
//   });

//   // HEADER
//   kitDoc.fontSize(20).text("APPLICATION REPORT", { align: "center" });
//   kitDoc.moveDown();

//   kitDoc.fontSize(12);
//   kitDoc.text(`Name: ${app.userDetails.name}`);
//   kitDoc.text(`Email: ${app.userDetails.email}`);
//   kitDoc.text(`Phone: ${app.userDetails.phone}`);
//   kitDoc.text(`Service: ${app.serviceName}`);
//   kitDoc.text(`Status: ${app.status}`);
//   kitDoc.moveDown(2);

//   kitDoc.text("Uploaded Documents", { underline: true });
//   kitDoc.moveDown();

//   for (const file of app.uploadedDocuments) {
//     if (file.fileType.startsWith("image")) {
//       const response = await axios.get(file.fileURL, {
//         responseType: "arraybuffer",
//       });

//       const imgBuffer = Buffer.from(response.data);

//       kitDoc.addPage();
//       kitDoc.image(imgBuffer, {
//         fit: [450, 600],
//         align: "center",
//       });
//     }
//   }

//   kitDoc.end();
//   await kitPromise;

//   const mainPdfBytes = Buffer.concat(buffers);
//   const mainPdf = await PDFDocument.load(mainPdfBytes);


//   const mainPages = await pdfDoc.copyPages(mainPdf, mainPdf.getPageIndices());
//   mainPages.forEach((page) => pdfDoc.addPage(page));


//   for (const file of app.uploadedDocuments) {
//     if (file.fileType === "application/pdf") {
//       const pdfResponse = await axios.get(file.fileURL, {
//         responseType: "arraybuffer",
//       });

//       const externalPdf = await PDFDocument.load(pdfResponse.data);
//       const pages = await pdfDoc.copyPages(
//         externalPdf,
//         externalPdf.getPageIndices()
//       );

//       pages.forEach((page) => pdfDoc.addPage(page));
//     }
//   }

 
//   const finalPdf = await pdfDoc.save();
//   return Buffer.from(finalPdf);
// }





// import { PDFDocument } from "pdf-lib";
// import axios from "axios";
// import PDFKit from "pdfkit";

// export default async function generatePDFBuffer(app) {
//   const pdfDoc = await PDFDocument.create();

//   const kitDoc = new PDFKit({
//     size: "A4",
//     margin: 0,
//   });

//   const buffers = [];
//   kitDoc.on("data", buffers.push.bind(buffers));
//   const kitPromise = new Promise((resolve) => {
//     kitDoc.on("end", resolve);
//   });

//   const pageWidth = kitDoc.page.width;
//   const pageHeight = kitDoc.page.height;

//   /* ================= PREMIUM HEADER ================= */

//   kitDoc.rect(0, 0, pageWidth, 140).fill("#0f172a");

//   kitDoc
//     .fillColor("#ffffff")
//     .font("Helvetica-Bold")
//     .fontSize(32)
//     .text("APPLICATION REPORT", 0, 60, { align: "center" });

//   // subtle bottom border
//   kitDoc
//     .moveTo(100, 130)
//     .lineTo(pageWidth - 100, 130)
//     .strokeColor("#334155")
//     .stroke();

//   // Application ID chip
//   kitDoc
//     .roundedRect(pageWidth - 200, 25, 160, 35, 20)
//     .fill("#1e293b");

//   kitDoc
//     .fillColor("#fff")
//     .fontSize(10)
//     .text(`Application ID: ${app._id || "APP-0001"}`, pageWidth - 185, 37);

//   /* ================= MAIN CARD ================= */

//   const cardX = 70;
//   const cardY = 170;
//   const cardWidth = pageWidth - 140;
//   const cardHeight = 260;

//   // shadow
//   kitDoc
//     .roundedRect(cardX + 8, cardY + 8, cardWidth, cardHeight, 16)
//     .fill("#e5e7eb");

//   // card
//   kitDoc
//     .roundedRect(cardX, cardY, cardWidth, cardHeight, 16)
//     .fill("#ffffff");

//   kitDoc
//     .fillColor("#111827")
//     .font("Helvetica-Bold")
//     .fontSize(20)
//     .text("Applicant Information", cardX + 40, cardY + 30);

//   kitDoc
//     .moveTo(cardX + 40, cardY + 65)
//     .lineTo(cardX + cardWidth - 40, cardY + 65)
//     .strokeColor("#e5e7eb")
//     .stroke();

//   const leftX = cardX + 50;
//   const rightX = cardX + 300;
//   let y = cardY + 90;

//   const fieldsLeft = [
//     ["Full Name", app.userDetails.name],
//     ["Email Address", app.userDetails.email],
//   ];

//   const fieldsRight = [
//     ["Contact Number", app.userDetails.phone],
//     ["Service Selected", app.serviceName],
//   ];

//   fieldsLeft.forEach((field, i) => {
//     kitDoc.fillColor("#6b7280").fontSize(12).font("Helvetica")
//       .text(field[0], leftX, y + i * 50);

//     kitDoc.fillColor("#111827").fontSize(14).font("Helvetica-Bold")
//       .text(field[1], leftX, y + 18 + i * 50);
//   });

//   fieldsRight.forEach((field, i) => {
//     kitDoc.fillColor("#6b7280").fontSize(12).font("Helvetica")
//       .text(field[0], rightX, y + i * 50);

//     kitDoc.fillColor("#111827").fontSize(14).font("Helvetica-Bold")
//       .text(field[1], rightX, y + 18 + i * 50);
//   });

//   /* ================= STATUS PILL ================= */

//   const statusColor =
//     app.status === "Approved"
//       ? "#16a34a"
//       : app.status === "Rejected"
//       ? "#dc2626"
//       : "#f59e0b";

//   kitDoc
//     .roundedRect(cardX + 50, cardY + 200, 200, 40, 25)
//     .fill(statusColor);

//   kitDoc
//     .fillColor("#ffffff")
//     .font("Helvetica-Bold")
//     .fontSize(14)
//     .text(`Status: ${app.status}`, cardX + 75, cardY + 212);

//   /* ================= DOCUMENT SECTION ================= */

//   let currentY = cardY + cardHeight + 50;

//   kitDoc
//     .font("Helvetica-Bold")
//     .fontSize(18)
//     .fillColor("#111827")
//     .text("Attached Documents", 80, currentY);

//   currentY += 30;

//   for (const file of app.uploadedDocuments) {
//     if (file.fileType.startsWith("image")) {
//       const response = await axios.get(file.fileURL, {
//         responseType: "arraybuffer",
//       });

//       const imgBuffer = Buffer.from(response.data);

//       if (currentY > pageHeight - 350) {
//         kitDoc.addPage();
//         currentY = 80;
//       }

//       // image border frame
//       kitDoc
//         .rect(75, currentY - 5, pageWidth - 150, 330)
//         .strokeColor("#e5e7eb")
//         .stroke();

//       kitDoc.image(imgBuffer, 80, currentY, {
//         fit: [pageWidth - 160, 320],
//         align: "center",
//       });

//       currentY += 360;
//     }
//   }

//   /* ================= FOOTER ================= */

//   kitDoc
//     .rect(0, pageHeight - 40, pageWidth, 40)
//     .fill("#f1f5f9");

//   kitDoc
//     .fillColor("#64748b")
//     .fontSize(9)
//     .text(
//       `Generated on ${new Date().toLocaleDateString()}  |  Confidential  |  Company Name`,
//       0,
//       pageHeight - 25,
//       { align: "center" }
//     );

//   kitDoc.end();
//   await kitPromise;

//   const mainPdfBytes = Buffer.concat(buffers);
//   const mainPdf = await PDFDocument.load(mainPdfBytes);

//   const pages = await pdfDoc.copyPages(mainPdf, mainPdf.getPageIndices());
//   pages.forEach((page) => pdfDoc.addPage(page));

//   for (const file of app.uploadedDocuments) {
//     if (file.fileType === "application/pdf") {
//       const pdfResponse = await axios.get(file.fileURL, {
//         responseType: "arraybuffer",
//       });

//       const externalPdf = await PDFDocument.load(pdfResponse.data);
//       const extPages = await pdfDoc.copyPages(
//         externalPdf,
//         externalPdf.getPageIndices()
//       );
//       extPages.forEach((page) => pdfDoc.addPage(page));
//     }
//   }

//   const finalPdf = await pdfDoc.save();
//   return Buffer.from(finalPdf);
// }



import { PDFDocument } from "pdf-lib";
import axios from "axios";
import PDFKit from "pdfkit";

// Company Configuration
const COMPANY_CONFIG = {
  name: "CADMA Associates Pvt Ltd",
  website: "www.cadmaassociatespvtltd.com",
  email: "support@cadmaassociatespvtltd.com",
  primaryColor: "#1e40af",
  secondaryColor: "#0f172a",
  successColor: "#10b981",
  warningColor: "#f59e0b",
  dangerColor: "#ef4444",
  lightGray: "#f8fafc",
  borderColor: "#e2e8f0",
  textDark: "#1e293b",
  textMedium: "#475569",
  textLight: "#64748b",
};

export default async function generatePDFBuffer(app) {
  const pdfDoc = await PDFDocument.create();

  const kitDoc = new PDFKit({
    size: "A4",
    margin: 0,
  });

  const buffers = [];
  kitDoc.on("data", buffers.push.bind(buffers));
  const kitPromise = new Promise((resolve) => {
    kitDoc.on("end", resolve);
  });

  const pageWidth = kitDoc.page.width;
  const pageHeight = kitDoc.page.height;

  /* ================= CLEAN PREMIUM HEADER ================= */

  kitDoc.rect(0, 0, pageWidth, 140).fill(COMPANY_CONFIG.secondaryColor);

  kitDoc.rect(0, 0, pageWidth, 5).fill(COMPANY_CONFIG.primaryColor);

  kitDoc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(22)
    .text(COMPANY_CONFIG.name, 0, 35, { align: "center" });

  kitDoc
    .fillColor("#cbd5e1")
    .font("Helvetica")
    .fontSize(11)
    .text(COMPANY_CONFIG.website, 0, 60, { align: "center" });

  kitDoc
    .moveTo(120, 80)
    .lineTo(pageWidth - 120, 80)
    .strokeColor("#334155")
    .lineWidth(1)
    .stroke();

  kitDoc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(30)
    .text("APPLICATION REPORT", 0, 95, { align: "center" });

  /* ================= APPLICANT INFORMATION CARD ================= */

  const cardX = 50;
  const cardY = 170;
  const cardWidth = pageWidth - 100;
  const cardHeight = 300;

  // clean shadow (no blur)
  kitDoc
    .roundedRect(cardX + 4, cardY + 4, cardWidth, cardHeight, 12)
    .fill("#e2e8f0");

  kitDoc
    .roundedRect(cardX, cardY, cardWidth, cardHeight, 12)
    .fill("#ffffff")
    .strokeColor(COMPANY_CONFIG.borderColor)
    .lineWidth(1)
    .stroke();

  kitDoc
    .fillColor(COMPANY_CONFIG.textDark)
    .font("Helvetica-Bold")
    .fontSize(18)
    .text("Applicant Information", cardX + 25, cardY + 30);

  kitDoc
    .moveTo(cardX + 25, cardY + 60)
    .lineTo(cardX + cardWidth - 25, cardY + 60)
    .strokeColor(COMPANY_CONFIG.borderColor)
    .stroke();

  const col1X = cardX + 30;
  const col2X = cardX + cardWidth / 2 + 10;
  let y = cardY + 85;
  const gap = 45;

  const leftFields = [
    ["Full Name", app.userDetails?.name || "N/A"],
    ["Email Address", app.userDetails?.email || "N/A"],
  ];

  const rightFields = [
    ["Phone Number", app.userDetails?.phone || "N/A"],
    ["Application Date", app.createdAt
      ? new Date(app.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "N/A"],
    ["Service Type", app.serviceName || "N/A"],
  ];

  leftFields.forEach(([label, value]) => {
    kitDoc.fillColor(COMPANY_CONFIG.textLight)
      .font("Helvetica")
      .fontSize(10)
      .text(label + ":", col1X, y);

    kitDoc.fillColor(COMPANY_CONFIG.textDark)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(String(value), col1X, y + 15);

    y += gap;
  });

  y = cardY + 85;

  rightFields.forEach(([label, value]) => {
    kitDoc.fillColor(COMPANY_CONFIG.textLight)
      .font("Helvetica")
      .fontSize(10)
      .text(label + ":", col2X, y);

    kitDoc.fillColor(COMPANY_CONFIG.textDark)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(String(value), col2X, y + 15);

    y += gap;
  });

  /* ================= STATUS BADGE ================= */

  const statusColor =
    app.status === "Approved"
      ? COMPANY_CONFIG.successColor
      : app.status === "Rejected"
      ? COMPANY_CONFIG.dangerColor
      : COMPANY_CONFIG.warningColor;

  kitDoc
    .roundedRect(cardX + 30, cardY + 240, 180, 35, 20)
    .fill(statusColor);

  kitDoc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(`Status: ${app.status || "Pending"}`, cardX + 50, cardY + 252);

  /* ================= ATTACHED DOCUMENTS SECTION ================= */

  let currentY = cardY + cardHeight + 50;

  // Only show documents section if there are uploaded documents
  if (app.uploadedDocuments && app.uploadedDocuments.length > 0) {
    // Check if we need a new page
    if (currentY > pageHeight - 400) {
      kitDoc.addPage();
      currentY = 50;
    }

    // Section header
    kitDoc
      .fillColor(COMPANY_CONFIG.textDark)
      .font("Helvetica-Bold")
      .fontSize(18)
      .text("Attached Documents", 50, currentY);

    kitDoc
      .moveTo(50, currentY + 25)
      .lineTo(pageWidth - 50, currentY + 25)
      .strokeColor(COMPANY_CONFIG.borderColor)
      .stroke();

    currentY += 50;

    // Process each uploaded document
    for (const file of app.uploadedDocuments) {
      // Handle images
      if (file.fileType && file.fileType.startsWith("image")) {
        // Check if we need a new page
        if (currentY > pageHeight - 350) {
          kitDoc.addPage();
          currentY = 50;
        }

        try {
          const response = await axios.get(file.fileURL, {
            responseType: "arraybuffer",
            timeout: 10000,
          });

          const imgBuffer = Buffer.from(response.data);

          // Document label
          if (file.fileName) {
            kitDoc
              .fillColor(COMPANY_CONFIG.textMedium)
              .font("Helvetica-Bold")
              .fontSize(11)
              .text(file.fileName, 50, currentY);
            currentY += 20;
          }

          // Image frame with border
          kitDoc
            .rect(50, currentY, pageWidth - 100, 280)
            .strokeColor(COMPANY_CONFIG.borderColor)
            .lineWidth(1.5)
            .stroke();

          // Add image
          kitDoc.image(imgBuffer, 55, currentY + 5, {
            fit: [pageWidth - 110, 270],
            align: "center",
            valign: "center",
          });

          currentY += 300;
        } catch (error) {
          console.error("Error loading image:", error);
          // Show error message
          kitDoc
            .fillColor(COMPANY_CONFIG.textLight)
            .font("Helvetica")
            .fontSize(10)
            .text("Unable to load image: " + (file.fileName || "Document"), 50, currentY);
          currentY += 30;
        }
      }
    }
  }

  /* ================= FOOTER ================= */

  const footerY = pageHeight - 50;

  kitDoc.rect(0, footerY, pageWidth, 50).fill(COMPANY_CONFIG.lightGray);

  kitDoc
    .moveTo(50, footerY)
    .lineTo(pageWidth - 50, footerY)
    .strokeColor(COMPANY_CONFIG.borderColor)
    .stroke();

  kitDoc
    .fillColor(COMPANY_CONFIG.textDark)
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(COMPANY_CONFIG.name, 0, footerY + 10, { align: "center" });

  kitDoc
    .fillColor(COMPANY_CONFIG.textMedium)
    .font("Helvetica")
    .fontSize(8)
    .text(
      `${COMPANY_CONFIG.website} | ${COMPANY_CONFIG.email}`,
      0,
      footerY + 23,
      { align: "center" }
    );

  kitDoc.end();
  await kitPromise;

  const mainPdfBytes = Buffer.concat(buffers);
  const mainPdf = await PDFDocument.load(mainPdfBytes);
  const pages = await pdfDoc.copyPages(mainPdf, mainPdf.getPageIndices());
  pages.forEach((page) => pdfDoc.addPage(page));

  // Append external PDF documents
  if (app.uploadedDocuments && app.uploadedDocuments.length > 0) {
    for (const file of app.uploadedDocuments) {
      if (file.fileType === "application/pdf") {
        try {
          const pdfResponse = await axios.get(file.fileURL, {
            responseType: "arraybuffer",
            timeout: 15000,
          });

          const externalPdf = await PDFDocument.load(pdfResponse.data);
          const extPages = await pdfDoc.copyPages(
            externalPdf,
            externalPdf.getPageIndices()
          );
          extPages.forEach((page) => pdfDoc.addPage(page));
        } catch (error) {
          console.error("Error loading PDF:", error);
        }
      }
    }
  }

  const finalPdf = await pdfDoc.save();
  return Buffer.from(finalPdf);
}