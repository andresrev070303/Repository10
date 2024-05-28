import { MailSender } from "./MailSender";

export class TransportMailSender extends MailSender {
  constructor(transport) {
    super();
    this.transport = transport;
  }

  sendMail(message) {
    this.transport.sendMail(message);
  }
}