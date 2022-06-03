import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Test } from 'src/app/models/test';
import {MatTableDataSource} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
import { AppModule } from 'src/app/app.module';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTestComponent } from './confirm-test/confirm-test.component';
import { AppComponent } from 'src/app/app.component';
import { PatientsService } from 'src/app/service/patients.service';
import { ChatService } from 'src/app/service/chat.service';
import { ChatComponent } from './chat/chat.component';
import { AuthService } from 'src/app/service/auth.service';
import { FinalizeComponent } from './finalize/finalize.component';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements AfterViewInit {

  displayedColumnsPending: string[] = ['status', 'date', 'fullname', 'symptoms', 'result', 'actions'];
  dataSourcePending: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  displayedColumnsInProgress: string[] = ['status', 'date', 'fullname', 'symptoms', 'result','final diagnosis', 'chat'];
  dataSourceInProgress: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  displayedColumnsFinalized: string[] = ['status', 'date', 'fullname', 'symptoms', 'result', 'final diagnosis', 'chat'];
  dataSourceFinalized: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  
  chats!: Map<String, boolean>;
  @ViewChild('paginatorPending') paginatorPending!: MatPaginator;
  @ViewChild('paginatorInProgress') paginatorInProgress!: MatPaginator;
  @ViewChild('paginatorFinalized') paginatorFinalized!: MatPaginator;

  @ViewChild('sortPending') sortPending!: MatSort;
  @ViewChild('sortInProgress') sortInProgress!: MatSort;
  @ViewChild('sortFinalized') sortFinalized!: MatSort;

  @ViewChild('tabs', {static: false}) tabs: any;

  constructor(public _testsService: TestsService,
    public _authService: AuthService,
    public _patientsService: PatientsService,
    public dialog: MatDialog,
    public chatService: ChatService,
    public myapp: AppComponent) { 
      // this.getPendingTests();
      // this.getTestsByDoctorID(Array.from(AppModule.userDoctor.keys())[0]);
  }

  ngAfterViewInit() {
    let map = new Map();
    this.chatService.getDoctorChats(localStorage.getItem("id")!).get().subscribe(data => {
      data.forEach(fr=> {
        if(localStorage.getItem("id") != fr.data().messages.pop()?.senderID){
          map.set(fr.id, fr.data().unRead);
        }
      });
    });
    this.chats = map;
    this._testsService.getPendingTestsForDoctors(localStorage.getItem("department")!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
      data.forEach(el => {
        el.result = this.myapp.parseDiagnosis(el.resultString);
        this.getPatient(el.patientID).then(d => {
          el.fullname = d.valueOf();
        });
      });
      this.dataSourcePending.data = data;
      this.dataSourcePending.sort = this.sortPending;
    });
    
    this._testsService.getInProgressTestsByDoctorId(localStorage.getItem('id')!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
      data.forEach(el => {
        el.result = this.myapp.parseDiagnosis(el.resultString);
        this.getPatient(el.patientID).then(d => {
          el.fullname = d.valueOf();
        });
      });
      this.dataSourceInProgress.data = data;
      this.dataSourceInProgress.sort = this.sortInProgress;
    });

    this._testsService.getFinalizedTestsByDoctorId(localStorage.getItem('id')!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
      data.forEach(el => {
        el.result = this.myapp.parseDiagnosis(el.resultString);
        this.getPatient(el.patientID).then(d => {
          el.fullname = d.valueOf();
        });
      });
      this.dataSourceFinalized.data = data;
      this.dataSourceFinalized.sort = this.sortFinalized;
    });

    this.dataSourcePending.paginator = this.paginatorPending;
    this.dataSourceInProgress.paginator = this.paginatorInProgress;
    this.dataSourceFinalized.paginator = this.paginatorFinalized;

    setTimeout(() => {
      this.notifMessages();
    },
    1500);
  }

  openConfirmTestDialog(id: any) {    
    const dialogRef = this.dialog.open(ConfirmTestComponent, {
      width: "50%", 
      data: {testID: id},
      hasBackdrop: true,
    });
  }

  openFinalizeDialog(id: any) {    
    const dialogRef = this.dialog.open(FinalizeComponent, {
      width: "30%", 
      data: {testID: id},
      hasBackdrop: true,
    });
  }

  async getPatient(id: string){
    let name: string;
    await this._authService.getUser(id).ref.get().then((doc) => {
      name = doc.get("fullname");
    });
    return name!;
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<Test>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }  
  }

  openChatDialog(chatId: string, testId: string) {    
    const dialogRef = this.dialog.open(ChatComponent, {
      width: "50%", 
      data: {chatID: chatId,testID: testId},
      hasBackdrop: true,
    });
    this.chatService.getChat(chatId).get().forEach(f=> {
      if(f.data()?.messages.pop()?.senderID != localStorage.getItem("id")){
        this.chatService.getChat(chatId).update({unRead : false});
      }
    });
    this.chats.set(chatId, false);7
    this.myapp.NotifCount--;
  }

  isChatUnread(id : string){
    if(this.chats.get(id) == true){
      return true;
    }
    else {
      return false;
    }
  }
  parseSymptoms(symptoms: string) : string{
    return symptoms.replace(/,/g,", ");
  }
  async notifMessages(){
    let unReadChat: number = 0;
    this.chats.forEach(a=> {
      if(a == true){
        unReadChat++;
      }
    });
    if(unReadChat! > 0){
      this.myapp.openSnackBar("You have " + unReadChat! +  " unread chats", "Continue");    
    }
  }
  
}
