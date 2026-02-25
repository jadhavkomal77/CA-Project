
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendStatusEmail = async (app) => {
  const subject =
    app.status === "Approved"
      ? "Your Application Approved"
      : "Your Application Rejected";

  const html = `
    <h2>Application Status Update</h2>
    <p>Name: ${app.userDetails.name}</p>
    <p>Status: <b>${app.status}</b></p>
    ${
      app.status === "Approved"
        ? `<p>Download PDF from dashboard.</p>`
        : `<p>Reason: ${app.adminNotes || "Not specified"}</p>`
    }
  `;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: app.userDetails.email,
    subject,
    html,
  });
};