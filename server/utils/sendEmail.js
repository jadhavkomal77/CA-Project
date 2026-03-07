import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {

  // console.log("EMAIL:", process.env.FROM_EMAIL);
  // console.log("PASS:", process.env.EMAIL_PASS);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject,
    html: message
  });

  console.log("email send success");

};