import { Component, AfterViewInit, ViewChild } from '@angular/core';
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

  displayedColumnsTests: string[] = ['date', 'symptoms', 'result', 'note'];
  dataSourceTests: MatTableDataSource<Test> = new MatTableDataSource<Test>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  id: string | undefined;
  role: string | undefined;
  
  constructor(public _testsService: TestsService,
    public dialog: MatDialog,
    public myapp: AppComponent) {
      this.id = localStorage.getItem('id')!;
      this.role = localStorage.getItem('role')!;
     }

  ngAfterViewInit(): void {

    this.dataSourceTests.paginator = this.paginator;
    this.dataSourceTests.sort = this.sort;
    if (this.role == 'patient'){
      this._testsService.getTestsByPatientId(this.id!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
        data.forEach(el => {
          el.result = this.myapp.parseDiagnosis(el.resultString);
        });
        this.dataSourceTests.data = data;
      });
    }
/*     else {
      this._testsService.getTestsByDoctorId(this.id!).valueChanges().subscribe((data: Test[]) => {
        data.forEach(el => {
          el.result = this.myapp.parseDiagnosis(el.resultString);
        });
        this.dataSourceTests.data = data;
      });      
    } */
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTests.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTests.paginator) {
      this.dataSourceTests.paginator.firstPage();
    }
  
  } 

  openChatDialog(chatId: string, testId: string) {    
    const dialogRef = this.dialog.open(ChatComponent, {
      width: "50%", 
      data: {chatID: chatId,testID: testId},
      hasBackdrop: true,
    });
  }
}
