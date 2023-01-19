import Nodemailer from "nodemailer";

export default class EmailService {

  smtpConfig : string;

  constructor({smtpConfig} : any) {
    this.smtpConfig = smtpConfig;
  }

  get transporter() {
    const opts = {
      port: 465,
      host: 'smtp.hostinger.com',
      secure: true,
      auth: {
        user: "konek@atabsecniv.com",
        pass: "Konekpassword123!",
      }
    };
    return Nodemailer.createTransport(opts);
  }

  async send(address: string) {
    const data = {
      from: 'konek@atabsecniv.com',
      to: address,
      subject: 'Message',
      text: 'I hope this message gets delivered!'
    };
    await this.transporter.sendMail(data);
  }
}