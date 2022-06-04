import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(public _testsService: TestsService,
    public _chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: {testID: string, department: string}) { }

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

}
