import { OurDate } from "./OurDate";
import { InMemoryTransport } from "./InMemoryTransport";
import { BirthdayService } from "./BirthdayService";
import { FileEmployeeRepository } from "./FileEmployeeRepository";
import { TransportMailSender } from "./TransportMailSender";

describe("Acceptance", () => {
  const SMTP_PORT = 25;
  const SMTP_URL = "localhost";
  const FILENAME = "employee_data.txt";
  let birthdayService;
  let transport;

  beforeEach(() => {
    transport = new InMemoryTransport();
    const employeeRepository = new FileEmployeeRepository(FILENAME);
    const mailSender = new TransportMailSender(transport);
    birthdayService = new BirthdayService(employeeRepository, mailSender);
  });

  it("base scenario", () => {
    birthdayService.sendGreetings(
      new OurDate("2008/10/08"),
      SMTP_URL,
      SMTP_PORT
    );

    expect(transport.messagesSent.length).toEqual(1);
    const message = transport.messagesSent[0];
    expect(message.text).toEqual("Happy Birthday, dear John!");
    expect(message.subject).toEqual("Happy Birthday!");
    const tos = message.to;
    expect(tos.length).toEqual(1);
    expect(tos[0]).toEqual("john.doe@foobar.com");
  });

  it("will not send emails when nobodys birthday", () => {
    birthdayService.sendGreetings(
      new OurDate("2008/01/01"),
      SMTP_URL,
      SMTP_PORT
    );

    expect(transport.messagesSent.length).toEqual(0);
  });

  it("uses correct transport", () => {
    birthdayService.sendGreetings(
      new OurDate("2008/10/08"),
      SMTP_URL,
      SMTP_PORT
    );

    const message = transport.messagesSent[0];
    expect(message.host).toEqual(SMTP_URL);
    expect(message.port).toEqual(SMTP_PORT);
  });
});