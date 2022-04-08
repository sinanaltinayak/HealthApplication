import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Test } from 'src/app/models/test';
import {MatTableDataSource} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
import { AppModule } from 'src/app/app.module';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTestComponent } from './confirm-test/confirm-test.component';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements AfterViewInit {

  displayedColumns: string[] = ['date', 'patient', 'symptoms', 'result', 'actions'];
  dataSource!: MatTableDataSource<Test>;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public _serviceTests: TestsService,
    public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource(AppModule.testsInfo);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openConfirmTestDialog(id: any) {

    console.log("testid",id);
    
    const dialogRef = this.dialog.open(ConfirmTestComponent, {
      width: "50%", 
      data: {testID: id},
      hasBackdrop: true,
    });
  }

}
