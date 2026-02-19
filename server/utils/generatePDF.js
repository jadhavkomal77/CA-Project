import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export default function generatePDF(app){

 return new Promise(resolve=>{

  const filePath=`uploads/${app._id}.pdf`;
  const doc=new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("APPLICATION DETAILS",{align:"center"});
  doc.moveDown();

  doc.fontSize(12).text(`Name: ${app.userDetails.name}`);
  doc.text(`Email: ${app.userDetails.email}`);
  doc.text(`Phone: ${app.userDetails.phone}`);
  doc.text(`Service: ${app.serviceName}`);
  doc.text(`Status: ${app.status}`);

  doc.moveDown();
  doc.text("Documents:");

  app.uploadedDocuments.forEach(d=>{
   doc.text("• "+d.documentName);
  });

  doc.end();

  resolve(filePath);
 });
}
