import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Test } from 'src/app/models/test';
import {MatTableDataSource} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
import { AppModule } from 'src/app/app.module';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { AppComponent } from 'src/app/app.component';

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

  constructor(public _testsService: TestsService,
    public myapp: AppComponent) { }

  ngAfterViewInit(): void {    
    
    this._testsService.getTestsByPatientId(Array.from(AppModule.userPatient.keys())[0]).valueChanges().subscribe((data: Test[]) => {
    data.forEach(el => {
      el.result = this.myapp.parseDiagnosis(el.resultString);
    });
    this.dataSourceTests.data = data;
  });

  }

}
