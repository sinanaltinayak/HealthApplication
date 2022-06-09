import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { ChatService } from 'src/app/service/chat.service';
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
  filteredDepartments!: Observable<string[]>;
  
  @ViewChild('departmentInput') departmentInput!: ElementRef<HTMLInputElement>;

  constructor(public _testsService: TestsService,
    public _chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: {testID: string, department: string}
  ) { 
    this.filteredDepartments = this.myControl.valueChanges.pipe(
      startWith(null),
      map((symptom: string | null) => (symptom ? this._filter(symptom) : this.departments.slice())),
    );
  }

  ngOnInit(): void {
  }

  async assignDepartment(){
    let chat: string;
    await this._testsService.getTestByID(this.data.testID).get().forEach(x=> {
      chat = x.data()!.chatID;
    });
    this._testsService.getTestByID(this.data.testID).update({department : this.selectedDepartment, doctorID : "", chatID : "", unRead : true});
    this._chatService.getChat(chat!).delete();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.departments.filter(option => option.toLowerCase().includes(filterValue));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedDepartment = event.option.viewValue;    
  }
}
