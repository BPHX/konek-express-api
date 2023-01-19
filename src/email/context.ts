import { asClass, asValue } from "awilix";
import EmailService from "./service";

const emailContext = {
  emailService: asClass(EmailService).scoped(),
  smtpConfig: asValue(""),
  // smtpConfig: asValue(new URL(process.env.SMTP_URL || '')),
};

export default emailContext;