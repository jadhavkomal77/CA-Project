// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//      user:process.env.FROM_EMAIL,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export default async function sendEmail({ to, subject, html }) {
//   await transporter.sendMail({
//     from: `"Service Team" <${process.env.EMAIL}>`,
//     to,
//     subject,
//     html,
//   });
// }




import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendEmail({ to, subject, html, attachments=[] }) {
  await transporter.sendMail({
    from: `"CADMA Support" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
    attachments
  });
}
