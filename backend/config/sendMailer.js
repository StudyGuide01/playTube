import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", 
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMailer = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: "Email for reset password",
      text: "Hello Dear",
      html: `<p>Your OTP is: <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });

    console.log("Message sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error while sending email:", error.message);
    return false;
  }
};

export default sendMailer;
