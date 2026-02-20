import PDFDocument from "pdfkit";
import axios from "axios";
import QRCode from "qrcode";
import Application from "../models/Application.js";

export const downloadApplicationPDF = async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).json({ message: "Not found" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=application.pdf");

  const doc = new PDFDocument({ margin:50 });
  doc.pipe(res);

  doc.fontSize(20).text("APPLICATION REPORT",{align:"center"});
  doc.moveDown();

  doc.fontSize(12);
  doc.text("Name: " + app.userDetails.name);
  doc.text("Email: " + app.userDetails.email);
  doc.text("Phone: " + app.userDetails.phone);
  doc.text("Service: " + app.serviceName);
  doc.text("Status: " + app.status);

  doc.moveDown().text("Documents:");

  for(const file of app.uploadedDocuments){

    doc.moveDown().text(file.documentName);

    if(file.fileURL.match(/jpg|png|jpeg|webp/)){
      try{
        const img = await axios.get(file.fileURL,{responseType:"arraybuffer"});
        doc.image(Buffer.from(img.data),{fit:[400,300],align:"center"});
      }catch{}
    }
  }

  const qr = await QRCode.toDataURL(`https://yourdomain.com/verify/${app._id}`);
  doc.addPage();
  doc.image(qr,{fit:[200,200],align:"center"});

  doc.end();
};