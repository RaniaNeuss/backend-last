import nodemailer from "nodemailer";

export const sendResetOtpEmail = async (to: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Password Reset OTP",
    html: `
      <p>You requested to reset your password.</p>
      <p>Use the following OTP to reset it:</p>
      <h2>${otp}</h2>
      <p>This code will expire in 10 minutes.</p>
    `,
  });
};
