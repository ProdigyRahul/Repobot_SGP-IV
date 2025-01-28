require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: "priyansi0320005@gmail.com", 
    subject: "Repobot Login Successful", 
    text: "Welcome to Repobot! You have successfully logged in. Enjoy using the bot and feel free to explore its features.", // The content of the email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent to:", to);
    console.log("Subject:", subject);
    console.log("Response:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email to", to, "with subject", subject);
    console.error("Error details:", error);
    throw error; 
  }
};

module.exports = sendMail; 
