import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Test } from 'src/app/models/test';
import {MatTableDataSource} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
import { AppModule } from 'src/app/app.module';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';

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
    public myapp: AppComponent) {
      this.id = localStorage.getItem('id')!;
      this.role = localStorage.getItem('role')!;
     }

  ngAfterViewInit(): void {

    console.log(this.role);
    if (this.role == 'patient'){
      this._testsService.getTestsByPatientId(this.id!).valueChanges().subscribe((data: Test[]) => {
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
    console.log(this.dataSourceTests.data.length);
  }

}
