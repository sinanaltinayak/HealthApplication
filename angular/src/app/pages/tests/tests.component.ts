import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Test } from 'src/app/models/test';
import {MatTableDataSource} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
import { AppModule } from 'src/app/app.module';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTestComponent } from './confirm-test/confirm-test.component';
import { map } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { PatientsService } from 'src/app/service/patients.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements AfterViewInit {

  displayedColumnsPending: string[] = ['date', 'patient', 'symptoms', 'result', 'actions'];
  dataSourcePending: MatTableDataSource<Test> = new MatTableDataSource<Test>();

  displayedColumnsHistory: string[] = ['date', 'patient', 'symptoms', 'result', 'actions'];
  dataSourceHistory: MatTableDataSource<Test> = new MatTableDataSource<Test>();



  
  @ViewChild(MatPaginator) paginatorHistory!: MatPaginator;
  @ViewChild(MatSort) sortHistory!: MatSort;
  @ViewChild(MatPaginator) paginatorPending!: MatPaginator;
  @ViewChild(MatSort) sortPending!: MatSort;

  constructor(public _testsService: TestsService,
    public _patientsService: PatientsService,
    public dialog: MatDialog,
    public myapp: AppComponent) { 
      // this.getPendingTests();
      // this.getTestsByDoctorID(Array.from(AppModule.userDoctor.keys())[0]);
  }

  ngAfterViewInit() {
    this._testsService.getPendingTests().valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
      data.forEach(el => {
        el.result = this.myapp.parseDiagnosis(el.resultString);
      });
      this.dataSourcePending.data = data;
    });

    this._testsService.getTestsByDoctorId(localStorage.getItem('id')!).valueChanges().subscribe((data: Test[]) => {
      data.forEach(el => {
        el.result = this.myapp.parseDiagnosis(el.resultString);
      });
      this.dataSourceHistory.data = data;
    });

    this.dataSourcePending.paginator = this.paginatorPending;
    this.dataSourcePending.sort = this.sortPending;
    this.dataSourceHistory.paginator = this.paginatorHistory;
    this.dataSourceHistory.sort = this.sortHistory;
  }

  openConfirmTestDialog(id: any) {
    console.log("ididd",id);
    
    const dialogRef = this.dialog.open(ConfirmTestComponent, {
      width: "50%", 
      data: {testID: id},
      hasBackdrop: true,
    });
  }

  getPatient(id: string){

    return AppModule.allPatients.get(id)?.fullname;
  }
  applyFilter(event: Event, dataSource: MatTableDataSource<Test>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  
  
  }
  
}
