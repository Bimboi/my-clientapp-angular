import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './app.interface';
import { EmployeeService } from './employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-clientapp-angular';
  newEmployeeName?: string;
  newEmployeeCompanyId?: string;
  newEmployeeAge?: number;
  employees?: Employee[];

  resetNewEmployee() {
    this.newEmployeeName = undefined;
    this.newEmployeeCompanyId = undefined;
    this.newEmployeeAge = undefined;
  }

  makeEditable(employee?: Employee) {
    employee!.isEditable = true;
  }

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.fetchEmployees()
      .subscribe({
        next: (response) => {
          console.log(response)
          this.employees = response;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => { }
      });
  }

  addEmployee() {
    const newEmployee: Employee = {
      name: this.newEmployeeName,
      company_id: this.newEmployeeCompanyId,
      age: this.newEmployeeAge
    }
    console.log(newEmployee)

    this.employeeService.addEmployee(newEmployee)
      .subscribe({
        next: (response) => {
          console.log('Employee created:', response);
          this.fetchEmployees();
          this.resetNewEmployee();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => { }
      });
  }

  editEmployee(employee?: Employee) {
    this.employeeService.editEmployee(employee)
      .subscribe({
        next: (response) => {
          console.log('Employee updated:', response);
          this.fetchEmployees();
          employee!.isEditable = false;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => { }
      });
  }

  deleteEmployee(employee?: Employee) {
    this.employeeService.deleteEmployee(employee)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.fetchEmployees();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => { }
      });
  }
}
