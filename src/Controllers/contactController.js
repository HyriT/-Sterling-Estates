import Contact from '../Models/contactModel.js';

import nodemailer from "nodemailer";

export const submitContactForm = async (req, res) => {
  try {
    const {fullName, phone, email, inquiryType, message } =
      req.body;

    const contact = new Contact({
      fullName,
      phone,
      email,
      message,
    });
    await contact.save();

    // ===== SMTP Transporter =====
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    const mailOptions = {
      from: `"Sterling Estate" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL, 
      subject: `New Contact from ${fullName} `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Contact form submitted and email sent successfully via SMTP.",
    });
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    res.status(500).json({ error: "Failed to submit contact form." });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact entries.' });
  }
};
