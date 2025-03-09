const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendEmail = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      res.status(400).json({ message: "Email is required" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOption = {
      from: "no-reply@example.com",
      to: email,
      subject: "Custom Space Design Confirmation",
      text: "Thank you for your interest! Our team will contact you soon.",
    };

    await transporter.sendMail(mailOption);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
