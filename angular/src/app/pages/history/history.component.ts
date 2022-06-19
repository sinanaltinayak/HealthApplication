import { Component, AfterViewInit, ViewChild, HostListener, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import {MatTableDataSource} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from './chat/chat.component';
import { RateComponent } from './rate/rate.component';
import { ChatService } from 'src/app/service/chat.service';
import { AuthService } from 'src/app/service/auth.service';
import { DiagnosisDialogComponent } from 'src/app/dialogs/diagnosis-dialog/diagnosis-dialog.component';
import { RemoveComponent } from './remove/remove.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements AfterViewInit {

  displayedColumnsPending: string[] = ['createdAt', 'symptoms', 'result', 'department', 'remove'];
  dataSourcePending: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  displayedColumnsInProgress: string[] = ['createdAt', 'symptoms', 'result', 'doctor', 'department', 'chat'];
  dataSourceInProgress: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  displayedColumnsFinalized: string[] = ['createdAt', 'symptoms', 'result', 'doctor', 'department', 'finalDiagnosis', 'chat', 'rate'];
  dataSourceFinalized: MatTableDataSource<Test> = new MatTableDataSource<Test>();

  chats!: Map<String, boolean>;
  @ViewChild('paginatorPending') paginatorPending!: MatPaginator;
  @ViewChild('sortPending') sortPending!: MatSort;
  @ViewChild('paginatorInProgress') paginatorInProgress!: MatPaginator;
  @ViewChild('sortInProgress') sortInProgress!: MatSort;
  @ViewChild('paginatorFinalized') paginatorFinalized!: MatPaginator;
  @ViewChild('sortFinalized') sortFinalized!: MatSort;
  @ViewChild('tabs', {static: false}) tabs: any;

  id: string | undefined;
  role: string | undefined;

  constructor(public _testsService: TestsService,
    public _chatService: ChatService,
    public _authService: AuthService,
    public dialog: MatDialog,
    public myapp: AppComponent) {
      this.id = localStorage.getItem('id')!;
      this.role = localStorage.getItem('role')!;
  }

  ngAfterViewInit(){
    let map = new Map();
    this._chatService.getPatientChats(localStorage.getItem("id")!).get().subscribe(data => {
      data.forEach(fr=> {
        if(localStorage.getItem("id") != fr.data().messages.pop()?.senderID){
          map.set(fr.id, fr.data().unRead);
        }
      });
    });
    this.chats = map;
    if (this.role == 'patient'){
      this._testsService.getPendingTestsByPatientId(this.id!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
        data.forEach(el => {
          el.result = this.myapp.parseDiagnosis(el.resultString);
        });
        this.dataSourcePending.data = data;
        this.dataSourcePending.sort = this.sortPending;
      });

      this._testsService.getInProgressTestsByPatientId(this.id!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
        data.forEach(el => {
          el.result = this.myapp.parseDiagnosis(el.resultString);
          this.getDoctor(el.doctorID).then(d=> {
            el.doctorname = d.valueOf();
          });
        });
        this.dataSourceInProgress.data = data;
        this.dataSourceInProgress.sort = this.sortInProgress;
      });

      this._testsService.getFinalizedTestsByPatientId(this.id!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
        data.forEach(el => {
          el.result = this.myapp.parseDiagnosis(el.resultString);
          this.getDoctor(el.doctorID).then(d=> {
            el.doctorname = d.valueOf();
          });
        });
        this.dataSourceFinalized.data = data;
        this.dataSourceFinalized.sort = this.sortFinalized;
      });
      setTimeout(() => {
        this.notifMessages();
      },
      1000);
    }
    
    this.dataSourcePending.paginator = this.paginatorPending;
    this.dataSourceInProgress.paginator = this.paginatorInProgress;
    this.dataSourceFinalized.paginator = this.paginatorFinalized;
  }
  applyFilter(event: Event, dataSource: MatTableDataSource<Test>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }  
  }

  openDiagnosisDialog(diagnosisName: string) {    
    const dialogRef = this.dialog.open(DiagnosisDialogComponent, {
      width: "50%", 
      data: {diagnosisName: diagnosisName},
      hasBackdrop: true,
    });
  }
  openChatDialog(chatId: string, testId: string) {    
    const dialogRef = this.dialog.open(ChatComponent, {
      width: "50%", 
      data: {chatID: chatId,testID: testId},
      hasBackdrop: true,
    });
    this._chatService.getChat(chatId).get().forEach(f=> {
      if(f.data()?.unRead == true){
        if(f.data()?.messages.pop()?.senderID != localStorage.getItem("id")){
          this._chatService.getChat(chatId).update({unRead : false});
        }
        this.myapp.NotifCount--;
      }
    });
    this.chats.set(chatId, false);
  }

  openRateDialog(rate: string, testId: string, name: string) {    
    const dialogRef = this.dialog.open(RateComponent, {
      width: "20%", 
      data: {rate: rate,testID: testId, drname: name},
      hasBackdrop: true,
    });
  }

  openRemovePendingDialog(testId: string) {    
    const dialogRef = this.dialog.open(RemoveComponent, {
      width: "20%", 
      data: {testID: testId},
      hasBackdrop: true,
    });
  }

  realignInkBar() {
    this.tabs.realignInkBar();
  }

  readTest(id: string){
    this._testsService.getTestByID(id).get().forEach(f=> {
      if(f.data()?.unRead == true){
        this._testsService.getTestByID(id).update({unRead: false});
        this.myapp.NotifCount--;
      } 
    });
  }
  
  isChatUnread(id : string){
    if(this.chats.get(id) == true){
      return true;
    }
    else {
      return false;
    }
  }

  parseSymptoms(symptoms: string) : string[]{
    var list = symptoms.split(",");
    return list;
  }
  
  async notifMessages(){
    let unReadFinalizedTest: number = 0;
    let unReadProgressTest: number = 0;
    let unReadReassignedTest: number = 0;
    let unReadChat: number = 0;
    let unReadCanceledTest: number = 0;
    await this._testsService.getInProgressTestsByPatientId(localStorage.getItem("id")!).get().forEach(e=> {
      e.docs.forEach(fe=> {
        if (fe.data()?.unRead == true){
          unReadProgressTest++;
        }
      })
    });
    await this._testsService.getFinalizedTestsByPatientId(localStorage.getItem("id")!).get().forEach(af=> {
      af.docs.forEach(ab=> {
        if(ab.data().unRead == true){
          if (ab.data().finalDiagnosis == 'Canceled'){
            unReadCanceledTest++;
          }
          else {
            unReadFinalizedTest++;
          }
        }
      });
    });
    await this._testsService.getPendingTestsByPatientId(localStorage.getItem("id")!).get().forEach(fe=> {
      fe.docs.forEach(x=> {
        if(x.get("unRead") == true){
          unReadReassignedTest++;
        }
      });
    });
    this.chats.forEach(a=> {
      if(a == true){
        unReadChat++;
      }
  });
  setTimeout(() => {
    let messages = [
      {
        count: unReadChat,
        text: "New messages from " + unReadChat! +  " unread chat!",
        text2: "New messages from " + unReadChat! +  " unread chats!",
        color: 'mat-primary'
      },
      {
        count: unReadProgressTest,
        text: unReadProgressTest! + " test started to be monitoring!",
        text2: unReadProgressTest! + " tests started to be monitoring!",
        color: 'mat-accent'
      },
      {
        count: unReadFinalizedTest,
        text: unReadFinalizedTest! + " test has been finalized!",
        text2: unReadFinalizedTest! + " tests has been finalized!",
        color: 'mat-accent'
      },
      {
        count: unReadReassignedTest,
        text: "The department of " + unReadReassignedTest! + " test has been reassigned by the doctor.",
        text2: "The department of " + unReadReassignedTest! + " tests has been reassigned by the doctor.",
        color: 'mat-warn'
      },
      {
        count: unReadCanceledTest,
        text: unReadCanceledTest! + " test has been canceled due to deactivation of the doctor account.",
        text2: unReadCanceledTest! + " tests have been canceled due to deactivation of the doctor account.",
        color: 'mat-warn'
      },
  ];
    this.myapp.openMultiSnackBar(messages);    

  },
  750);
  }

  async getDoctor(id: string){
    let name: string;
    await this._authService.getUser(id).ref.get().then((doc) => {
      name = doc.get("fullname");
    });
    return name!;
  }
}
