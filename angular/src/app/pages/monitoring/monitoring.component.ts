import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MonitorService } from 'src/app/service/monitor.service';
import { AppComponent } from 'src/app/app.component';
import { Monitor } from 'src/app/models/monitor';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-monitoring',
  styleUrls: ['./monitoring.component.css'],
  templateUrl: './monitoring.component.html',
})
export class MonitoringComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'highBP', 'lowBP', 'temp', 'sugar', 'delete'];
  dataSourceMonitor: MatTableDataSource<Monitor> = new MatTableDataSource<Monitor>();
  highBP!: string;
  lowBP!: string;
  bloodSugarLevel!: string;
  temprature!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public _monitorService: MonitorService,
    public myapp: AppComponent,
  ) {

  }

  ngAfterViewInit() {
    this.dataSourceMonitor.paginator = this.paginator;
    this.dataSourceMonitor.sort = this.sort;

    this._monitorService.getPatientMonitors(localStorage.getItem("id")!).valueChanges({ idField: 'eventId' }).subscribe((data: Monitor[]) => {
      this.dataSourceMonitor.data = data;
    });

    console.log(this.dataSourceMonitor);
    
  }

  saveResults(){

    let date = new Date().toDateString();
    let patientID = localStorage.getItem("id")!;
    let monitor = new Monitor(patientID, date, Number(this.highBP), Number(this.lowBP), Number(this.bloodSugarLevel), Number(this.temprature));

    this._monitorService.setPatientMonitors(monitor);
    this.highBP =  '';
    this.lowBP =  '';
    this.bloodSugarLevel =  '';
    this.temprature =  '';
  }

  removeRow(i: number, id: string){

    console.log(id);
    this._monitorService.removePatientMonitors(id);
    this.dataSourceMonitor.data.splice(i, 1);
    /* window.location.reload(); */
  }
}
