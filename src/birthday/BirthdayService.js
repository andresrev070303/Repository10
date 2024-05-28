export class BirthdayService {
  constructor(employeeRepository, mailSender) {
    this.employeeRepository = employeeRepository;
    this.mailSender = mailSender;
  }

  sendGreetings(ourDate, smtpUrl, smtpPort) {
    const employees = this.employeeRepository.getEmployees()
      .filter((employee) => employee.isBirthday(ourDate));

    employees.forEach((employee) => {
      const message = {
        host: smtpUrl,
        port: smtpPort,
        from: "sender@here.com",
        to: [employee.getEmail()],
        subject: "Happy Birthday!",
        text: `Happy Birthday, dear ${employee.getFirstName()}!`,
      };
      this.mailSender.sendMail(message);
    });
  }
}
