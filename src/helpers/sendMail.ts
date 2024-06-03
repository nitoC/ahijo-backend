const nodemailer = require("nodemailer");

export const sendMail = (mail: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your email",
      pass: "your password",
    },
  });
  const mailOptions = {
    from: "your email",
    to: "your email",
    subject: "Sending Email using Node.js",
    text: mail,
  };
  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
