import PDF from "@components/PDF";
import { renderToStream } from "@react-pdf/renderer";

export default async function handler(req, res) {
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
    // to: "vovkasmail03@gmail.com",
    to: req.body.email,
    subject: `Сообщение от ${req.body.name}`,
    text: "Новый заказ от" + req.body.email,
    html: `<p>Телефон: ${req.body.phone}</p><p>Email: ${req.body.email}</p><p>Link: ${req.body.url}</p>`,
    attachments: [
      {
        filename: `Заказ ${req.body.name}.pdf`,
        content: await renderToStream(
          <PDF
            name={req.body.name}
            discounts={req.body.store.discounts}
            cartThree={req.body.store.cartThree}
            cartThreeOptions={req.body.store.cartThreeOptions}
            cartOne={req.body.store.cartOne}
            dates={req.body.store.dates}
            totalForSections={req.body.store.totalForSections}
            totalForSectionThree={req.body.store.totalForSectionThree}
            data={req.body.data}
          />
        ),
      },
    ],
  };

  transporter.sendMail(mailData, (err) => {
    if (err) {
      console.log("Error " + err);
      res.statusCode = 500;
      res.send();
    } else {
      res.send();
    }
  });
}
