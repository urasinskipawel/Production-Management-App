require('dotenv').config();
import * as nodeMail from 'nodemailer';

export const mainMail = async (name: string, email: string, subject: string, message: string) => {
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  };
  const transporter = nodeMail.createTransport(smtpConfig);

  const mailOption = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: subject,
    html: `User ${name} send you message from ${email}.
    Message : ${message}`,
  };

  try {
    await transporter.sendMail(mailOption);
    return await Promise.resolve('Message Sent Successfully!');
  } catch (error) {
    return Promise.reject(error);
  }
};
