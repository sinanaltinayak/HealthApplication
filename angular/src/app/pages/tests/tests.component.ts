import { Component, AfterViewInit, ViewChild} from '@angular/core';
import { Test } from 'src/app/models/test';
import {MatTableDataSource} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
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
import { firstValueFrom, take } from 'rxjs';
import { DepartmentComponent } from './department/department.component';
import { DiagnosisDialogComponent } from 'src/app/dialogs/diagnosis-dialog/diagnosis-dialog.component';
import { PatientInformationDialogComponent } from 'src/app/dialogs/patient-information-dialog/patient-information-dialog.component';
import { PatientMonitoringDialogComponent } from 'src/app/dialogs/patient-monitoring-dialog/patient-monitoring-dialog.component';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements AfterViewInit {

  displayedColumnsPending: string[] = ['createdAt', 'fullname', 'symptoms', 'result', 'actions'];
  dataSourcePending: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  displayedColumnsInProgress: string[] = ['createdAt', 'fullname', 'symptoms', 'result','actions', 'chat'];
  dataSourceInProgress: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  displayedColumnsFinalized: string[] = ['createdAt', 'fullname', 'symptoms', 'result', 'final diagnosis', 'chat'];
  dataSourceFinalized: MatTableDataSource<Test> = new MatTableDataSource<Test>();
  department!: string;
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

  async ngAfterViewInit() {
    await this.getDepartment();
    let map = new Map();
    this.chatService.getDoctorChats(localStorage.getItem("id")!).get().subscribe(data => {
      data.forEach(fr=> {
        if(localStorage.getItem("id") != fr.data().messages.pop()?.senderID){
          map.set(fr.id, fr.data().unRead);
        }
      });
    });
    this.chats = map;
    this._testsService.getPendingTestsForDoctors(this.department).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
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

  openDepartmentDialog(id: any, dep: any) {    
    const dialogRef = this.dialog.open(DepartmentComponent, {
      width: "20%", 
      data: {testID: id, department: dep},
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

  openDiagnosisDialog(diagnosisName: string) {    
    const dialogRef = this.dialog.open(DiagnosisDialogComponent, {
      width: "50%", 
      data: {diagnosisName: diagnosisName},
      hasBackdrop: true,
    });
  }

  openPatientInformationDialog(patientID: string, patientName: string) {    
    const dialogRef = this.dialog.open(PatientInformationDialogComponent, {
      width: "50%", 
      data: {
        patientID: patientID,
        patientName: patientName
      },
      hasBackdrop: true,
    });
  }

  openPatientMonitoringDialog(patientID: string, patientName: string) {    
    const dialogRef = this.dialog.open(PatientMonitoringDialogComponent, {
      width: "fit", 
      data: {
        patientID: patientID,
        patientName: patientName
      },
      hasBackdrop: true,
    });
  }

  openChatDialog(chatId: string, testId: string) {    
    const dialogRef = this.dialog.open(ChatComponent, {
      width: "fit", 
      data: {chatID: chatId,testID: testId},
      hasBackdrop: true,
    });
    this.chatService.getChat(chatId).get().forEach(f=> {
      if(f.data()?.messages.pop()?.senderID != localStorage.getItem("id")){
        this.chatService.getChat(chatId).update({unRead : false});
      }
    });
    this.chats.set(chatId, false);
    this.myapp.NotifCount--;
  }

  isPendingLong(datetime: string){
    let cssClasses = {
      'week': false,
      'month': false,
    };
    var testdate = new Date(datetime);
    var weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    if(weekAgo > testdate) {
      cssClasses = {
        'week': true,
        'month': false
       }
    }
    var monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    if (monthAgo > testdate){
      cssClasses = {
        'week': false,
        'month': true
       }
    }
    return cssClasses;
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
    let unReadChat: number = 0;
    this.chats.forEach(a=> {
      if(a == true){
        unReadChat++;
      }
    });
    if(unReadChat! > 0){
      if(unReadChat == 1){
        this.myapp.openSnackBar("New messages from " + unReadChat! +  " unread chat!", "Continue", 'mat-primary');
      }
      else{
        this.myapp.openSnackBar("New messages from " + unReadChat! +  " unread chats!", "Continue", 'mat-primary'); 
      }
    }
  }

   async getDepartment(){
    const user$ =  this._authService.getUser(localStorage.getItem("id")!).snapshotChanges().pipe(take(1));
    this.department = (await firstValueFrom(user$)).payload.get("department");
  }
  
  realignInkBar() {
    this.tabs.realignInkBar();
  }
}
