import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.MAIL_PORT, 10) || 587,
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || ''
  }
});

export async function sendMail({ to, subject, html, from }) {
  const mailOptions = {
    from: from || process.env.MAIL_FROM || '"No Reply" <no-reply@example.com>',
    to,
    subject,
    html
  };
  return transporter.sendMail(mailOptions);
}

export default transporter;
