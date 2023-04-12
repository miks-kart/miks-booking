export default function handler(req, res) {
  require("dotenv").config();

  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "noreply.miks@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: "noreply.miks@gmail.com",
    // to: "manager@miks-kart.ru",
    to: "vovkasmail03@gmail.com",
    subject: `Сообщение от ${req.body.name}`,
    text: req.body.message + " | Отправлено от: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Телефон: ${req.body.phone}</p><p>Email: ${req.body.email}</p>`,
  };

  transporter.sendMail(mailData, (err) => {
    if (err) {
      res.statusCode = 500;
      res.send();
    } else {
      res.send();
    }
  });
}
