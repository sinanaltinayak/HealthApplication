import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Test } from 'src/app/models/test';
import {MatTableDataSource} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
import { AppModule } from 'src/app/app.module';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
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



  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public _testsService: TestsService,
    public _authService: AuthService,
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
        this.getPatient(el.patientID).then(d => {
          el.fullname = d.valueOf();
        });
      });
      this.dataSourcePending.data = data;
    });

    this._testsService.getTestsByDoctorId(localStorage.getItem('id')!).valueChanges().subscribe((data: Test[]) => {
      data.forEach(el => {
        el.result = this.myapp.parseDiagnosis(el.resultString);
      });
      this.dataSourceHistory.data = data;
    });

    // this.dataSourcePending.paginator = this.paginator;
    // this.dataSourcePending.sort = this.sort;
    // this.dataSourceHistory.paginator = this.paginator;
    // this.dataSourceHistory.sort = this.sort;
  }

  openConfirmTestDialog(id: any) {
    
    const dialogRef = this.dialog.open(ConfirmTestComponent, {
      width: "50%", 
      data: {testID: id},
      hasBackdrop: true,
    });
  }

  async getPatient(id: string){
    let name: string;
    await this._authService.getUser(id).ref.get().then((doc) => {
      name = doc.get("fullname");
      console.log(name);
    });
    return name!;
  }
  
}
