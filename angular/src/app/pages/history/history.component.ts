import { Component, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { Test } from 'src/app/models/test';
import {MatTableDataSource} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements AfterViewInit {

  displayedColumnsPending: string[] = ['status','date', 'symptoms', 'result'];
  dataSourcePending: MatTableDataSource<Test> = new MatTableDataSource<Test>();

  displayedColumnsReviewed: string[] = ['status','date', 'symptoms', 'result', 'final diagnosis', 'chat'];
  dataSourceReviewed: MatTableDataSource<Test> = new MatTableDataSource<Test>();

  @ViewChild('paginatorPending') paginatorPending!: MatPaginator;
  @ViewChild(MatSort) sortPending!: MatSort;
  @ViewChild('paginatorReviewed') paginatorReviewed!: MatPaginator;
  @ViewChild(MatSort) sortReviewed!: MatSort;
  @ViewChild('tabs', {static: false}) tabs: any;

  id: string | undefined;
  role: string | undefined;
  
  constructor(public _testsService: TestsService,
    public dialog: MatDialog,
    public myapp: AppComponent) {
      this.id = localStorage.getItem('id')!;
      this.role = localStorage.getItem('role')!;
     }

  ngAfterViewInit(){
    if (this.role == 'patient'){
      this._testsService.getPendingTestsByPatientId(this.id!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
        data.forEach(el => {
          el.result = this.myapp.parseDiagnosis(el.resultString);
        });
        this.dataSourcePending.data = data;
      });

      this._testsService.getReviewedTestsByPatientId(this.id!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
        data.forEach(el => {
          el.result = this.myapp.parseDiagnosis(el.resultString);
        });
        this.dataSourceReviewed.data = data;
      });
    }
    

    this.dataSourcePending.paginator = this.paginatorPending;
    this.dataSourcePending.sort = this.sortPending;
    this.dataSourceReviewed.paginator = this.paginatorReviewed;
    this.dataSourceReviewed.sort = this.sortReviewed;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePending.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcePending.paginator) {
      this.dataSourcePending.paginator.firstPage();
    }
  
  } 

  openChatDialog(chatId: string, testId: string) {    
    const dialogRef = this.dialog.open(ChatComponent, {
      width: "50%", 
      data: {chatID: chatId,testID: testId},
      hasBackdrop: true,
    });
  }

  realignInkBar() {
    this.tabs.realignInkBar();
  }

  readTest(id: string){
    this._testsService.getTestByID(id).update({unRead: true});
  }
}
