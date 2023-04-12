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
    from: '"MIKS KARTING" noreply.miks@gmail.com',
    to: req.body.email,
    subject: `Формирование заказа`,
    text: `Уважаемый(ая) ${req.body.name}, мы получили ваш заказ. В ближайшее время наш менеджер свяжется с вами по указанному номеру телефона для уточнения деталей.`,
    html: `<p>Уважаемый(ая) ${req.body.name}, мы получили ваш заказ. В ближайшее время наш менеджер свяжется с вами по указанному номеру телефона для уточнения деталей.\nПредварительную стоимость заказа вы можете найти во вложении к этому письму.</p>`,
    attachments: [
      {
        filename: `Заказ ${req.body.name}.pdf`,
        content: await renderToStream(
          <PDF
            conf={req.body.conf}
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
