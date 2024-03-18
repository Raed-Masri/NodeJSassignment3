import * as nodemailer from "nodemailer";

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

const sendEmail = async (options: EmailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "raedmasri75@gmail.com",
        pass: "rpxi atpe febk wfty",
      },
    });

    await transporter.sendMail(options);
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
