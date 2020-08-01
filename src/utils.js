import { adjectives, nouns } from "./words";
import Mailgun from "mailgun-js";
import jwt from "jsonwebtoken";

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

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
