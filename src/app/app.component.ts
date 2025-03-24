import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './Model/Employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm : FormGroup = new FormGroup({});

  employeeObj :EmployeeModel = new EmployeeModel();
  employeelist : EmployeeModel[]=[];

  constructor(){
    this.createForm()
    debugger;

    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){

      const parseData = JSON.parse(oldData);
      this.employeelist = parseData;

    }
  }

  reset(){
    this.employeeObj = new EmployeeModel();
    this.createForm()
  }


  createForm(){
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empid),
      name: new FormControl(this.employeeObj.name , [Validators.required]),
      city: new FormControl(this.employeeObj.city),

      contactNo: new FormControl(this.employeeObj.contactNo),

      emailId: new FormControl(this.employeeObj.emailId),

      address: new FormControl(this.employeeObj.address),
      state: new FormControl(this.employeeObj.state),

      pinCode: new FormControl(this.employeeObj.pinCode , [Validators.required, Validators.minLength(6)]),



    })
  }

  onSave() {
    debugger;
    const oldData = localStorage.getItem("EmpData");
    
    if (oldData) {
      const parseData: EmployeeModel[] = JSON.parse(oldData);
      this.employeeForm.controls['empid'].setValue(parseData.length + 1);
      
      // Update the local list correctly
      parseData.unshift(this.employeeForm.value);
      this.employeelist = parseData;
    } else {
      this.employeeForm.controls['empid'].setValue(1); // Set empid to 1 for first entry
      this.employeelist = [this.employeeForm.value]; // Initialize list with first employee
    }
  
    localStorage.setItem("EmpData", JSON.stringify(this.employeelist));
    this.reset()
  }

  onEdit(item: EmployeeModel){
    this.employeeObj = item;
    this.createForm()

  }

  onUpdate(){
    const record = this.employeelist.find(m=>m.empid == this.employeeForm.controls['empid'].value);
    if (record !=undefined){
      record.address= this.employeeForm.controls['address'].value;
      record.name= this.employeeForm.controls['name'].value;

      record.contactNo= this.employeeForm.controls['contactNo'].value;

    }
  
    localStorage.setItem("EmpData", JSON.stringify(this.employeelist));
    this.reset()

    
  }

  onDelete(id : number){
    const isDelete = confirm("Are you sure you want to Delete");
    if(isDelete) {
      const index = this.employeelist.findIndex(m=>m.empid ==id);
      this.employeelist.splice(index,1)
      localStorage.setItem("EmpData", JSON.stringify(this.employeelist));

    }

  }
  

  // onSave(){
  //   debugger;
  //   const oldData = localStorage.getItem("EmpData");
  //   if(oldData != null){
  //     const parseData = JSON.parse(oldData);
  //     this.employeeForm.controls['empid'].setValue(parseData.length+1);
  //     this.employeelist.unshift(this.employeeForm.value);

  //   }
  //   else{
  //     this.employeelist.unshift(this.employeeForm.value);

  //   }

  //   localStorage.setItem("EmpData", JSON.stringify(this.employeelist))

  // }
}
