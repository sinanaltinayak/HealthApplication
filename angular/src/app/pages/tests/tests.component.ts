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

  displayedColumnsPending: string[] = ['status', 'date', 'patient', 'symptoms', 'result', 'actions'];
  dataSourcePending: MatTableDataSource<Test> = new MatTableDataSource<Test>();

  displayedColumnsReviewed: string[] = ['status', 'date', 'fullname', 'symptoms', 'result', 'final diagnosis', 'chat'];
  dataSourceReviewed: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  chats!: Map<String, boolean>;
  @ViewChild('paginatorPending') paginatorPending!: MatPaginator;
  @ViewChild('paginatorReviewed') paginatorReviewed!: MatPaginator;
  @ViewChild('sortPending') sortPending!: MatSort;
  @ViewChild('sortReviewed') sortReviewed!: MatSort;
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
    this.chatService.getDoctorChats(localStorage.getItem("id")!).valueChanges({idField: 'id'}).subscribe(data => {
      data.forEach(fr=> {
        if(localStorage.getItem("id") != fr.messages.pop()?.senderID){
          map.set(fr.id, fr.unRead);
        }
      });
    });
    this.chats = map;
    console.log(this.chats)
    this._testsService.getPendingTests().valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
      data.forEach(el => {
        el.result = this.myapp.parseDiagnosis(el.resultString);
        this.getPatient(el.patientID).then(d => {
          el.fullname = d.valueOf();
        });
      });
      this.dataSourcePending.data = data;
      this.dataSourcePending.sort = this.sortPending;
    });
    
    this._testsService.getTestsByDoctorId(localStorage.getItem('id')!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
      data.forEach(el => {
        el.result = this.myapp.parseDiagnosis(el.resultString);
        this.getPatient(el.patientID).then(d => {
          el.fullname = d.valueOf();
        });
      });
      this.dataSourceReviewed.data = data;
      this.dataSourceReviewed.sort = this.sortReviewed;
    });

    this.dataSourcePending.paginator = this.paginatorPending;
    this.dataSourceReviewed.paginator = this.paginatorReviewed;
    //this.currentChat = this.chatService.getTestChat("");
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
      width: "20%", 
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
    this.chatService.getChat(chatId).update({unRead : false});
  }

  isChatUnread(id : string){
    if(this.chats.get(id) == true){
      return true;
    }
    else {
      return false;
    }
  }
  
}
