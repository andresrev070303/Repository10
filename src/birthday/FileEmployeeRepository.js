import fs from "fs";
import path from "path";
import { EmployeeRepository } from "./EmployeeRepository";
import { Employee } from "./Employee";

export class FileEmployeeRepository extends EmployeeRepository {
  constructor(fileName) {
    super();
    this.fileName = fileName;
  }

  getEmployees() {
    const data = fs.readFileSync(
      path.resolve(__dirname, this.fileName),
      "UTF-8"
    );
    const lines = data.split(/\r?\n/);
    lines.shift(); // remove header

    return lines.map((line) => this.createEmployeeFromLine(line));
  }

  createEmployeeFromLine(line) {
    const employeeData = line.split(", ");
    return new Employee(
      employeeData[1],
      employeeData[0],
      employeeData[2],
      employeeData[3]
    );
  }
}