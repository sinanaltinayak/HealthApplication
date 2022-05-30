import { Component, AfterViewInit, ViewChild, HostListener, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import {MatTableDataSource} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements AfterViewInit {

  displayedColumnsPending: string[] = ['status','date', 'symptoms', 'result'];
  dataSourcePending: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  displayedColumnsInProgress: string[] = ['status','date', 'symptoms', 'result', 'chat'];
  dataSourceInProgress: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  displayedColumnsFinalized: string[] = ['status','date', 'symptoms', 'result', 'final diagnosis', 'chat'];
  dataSourceFinalized: MatTableDataSource<Test> = new MatTableDataSource<Test>();

  chats!: Map<String, boolean>;
  @ViewChild('paginatorPending') paginatorPending!: MatPaginator;
  @ViewChild(MatSort) sortPending!: MatSort;
  @ViewChild('paginatorInProgress') paginatorInProgress!: MatPaginator;
  @ViewChild(MatSort) sortInProgress!: MatSort;
  @ViewChild('paginatorFinalized') paginatorFinalized!: MatPaginator;
  @ViewChild(MatSort) sortFinalized!: MatSort;
  @ViewChild('tabs', {static: false}) tabs: any;

  id: string | undefined;
  role: string | undefined;
  
  constructor(public _testsService: TestsService,
    public _chatService: ChatService,
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
      });

      this._testsService.getInProgressTestsByPatientId(this.id!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
        data.forEach(el => {
          el.result = this.myapp.parseDiagnosis(el.resultString);
        });
        this.dataSourceInProgress.data = data;
      });

      this._testsService.getFinalizedTestsByPatientId(this.id!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
        data.forEach(el => {
          el.result = this.myapp.parseDiagnosis(el.resultString);
        });
        this.dataSourceFinalized.data = data;
      });
    }
    
    this.dataSourcePending.paginator = this.paginatorPending;
    this.dataSourcePending.sort = this.sortPending;
    this.dataSourceInProgress.paginator = this.paginatorInProgress;
    this.dataSourceInProgress.sort = this.sortInProgress;
    this.dataSourceFinalized.paginator = this.paginatorFinalized;
    this.dataSourceFinalized.sort = this.sortFinalized;
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
    this._chatService.getChat(chatId).get().forEach(f=> {
      if(f.data()?.messages.pop()?.senderID != localStorage.getItem("id")){
        this._chatService.getChat(chatId).update({unRead : false});
      }
    });
  }

  realignInkBar() {
    this.tabs.realignInkBar();
  }

  readTest(id: string){
    this._testsService.getTestByID(id).update({unRead: false});
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
  return symptoms.replace(",",", ");
}
}
