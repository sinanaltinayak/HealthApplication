import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestsService } from 'src/app/service/tests.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: string[] = ["Dermatology", "Immunology", "Gastroenterology", "Internal Diseases", "Endocrinology", "Chest Diseases", "Neurology",
"Rheumatology", "Infectious Diseases", "General Surgery", "Cardiology"];
  myControl = new FormControl();
  selectedDepartment: string = "";

  constructor(public _testsService: TestsService,
    @Inject(MAT_DIALOG_DATA) public data: {testID: string}) { }

  ngOnInit(): void {
  }

  assignDepartment(){
    this._testsService.getTestByID(this.data.testID).update({department : this.selectedDepartment, doctorID : "", chatID : "", unRead : true});
  }

}
