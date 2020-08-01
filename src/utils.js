// .env 파일을 import하기위한 코드
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";
// import nodemailer from "nodemailer";
// import sgTransport from "nodemailer-sendgrid-transport";
import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox0a6c0c68732848c09e0b25b1128e0c6b.mailgun.org",
});

const sendEmail = (subject, html) => {
  const emailData = {
    from: "kko0831@hanmail.net", // 본인의 이메일로 변경
    to: "kko0831@hanmail.net", // 본인의 이메일로 변경
    subject,
    html,
  };
  return mailGunClient.messages().send(emailData);
};

export const sendSecretMail = (fullName, key) => {
  const emailSubject = `Hello~ ${fullName}, 🔒Login Secret for Prismagram🔒`;
  const emailBody = `Hello! Your login secret it ${key}.<br/>Copy paste on the app/website to log in`;
  return sendEmail(emailSubject, emailBody);
};

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

/* 
const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENGRID_PASSWORD,
    },
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "kko0831@prismagram.com",
    to: address,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to log in`,
  };
  return sendMail(email);
}; 
*/
