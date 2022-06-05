import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MonitorService } from 'src/app/service/monitor.service';
import { AppComponent } from 'src/app/app.component';
import { Monitor } from 'src/app/models/monitor';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-monitoring',
  styleUrls: ['./monitoring.component.css'],
  templateUrl: './monitoring.component.html',
})
export class MonitoringComponent implements AfterViewInit {
  displayedColumns: string[] = ['createdAt', 'highBP', 'lowBP', 'temperature', 'bloodSugarLevel', 'delete'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  
  dataSourceMonitor: MatTableDataSource<Monitor> = new MatTableDataSource<Monitor>();

  highBP!: string;
  lowBP!: string;
  bloodSugarLevel!: string;
  temperature!: string;


  viewControl = this.fb.group({
    highBP:  [Validators.min(50), Validators.max(150)],
    lowBP:  [Validators.min(10), Validators.max(120)],
    temperature:  [Validators.min(0), Validators.max(100)],
    bloodSugarLevel:  [Validators.min(50), Validators.max(150)],
  });

  saveMonitorDisabled = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public _monitorService: MonitorService,
    public myapp: AppComponent,
    private fb: FormBuilder
  ) {

  }

  ngAfterViewInit() {
    this.dataSourceMonitor.paginator = this.paginator;
    this.dataSourceMonitor.sort = this.sort;

    this._monitorService.getPatientMonitors(localStorage.getItem("id")!).valueChanges({ idField: 'eventId' }).subscribe((data: Monitor[]) => {
      this.dataSourceMonitor.data = data;
    });    
  }

  saveResults(){

    let patientID = localStorage.getItem("id")!;
    let monitor = new Monitor(patientID, Date.now(), Number(this.highBP), Number(this.lowBP), Number(this.bloodSugarLevel), Number(this.temperature));

    this._monitorService.setPatientMonitors(monitor);
    this.highBP =  '';
    this.lowBP =  '';
    this.bloodSugarLevel =  '';
    this.temperature =  '';
  }

  removeRow(i: number, id: string){
    this._monitorService.removePatientMonitors(id);
    this.dataSourceMonitor.data.splice(i, 1);
    /* window.location.reload(); */
  }

  checkNull(text: string) : string{
    var result = (text) ? text : "-";
    return result;
  }

  controlView(view: boolean, name: string){
    view ? this.addColumn(name) : this.removeColumn(name);
  }
  
  addColumn(name: string) {
    this.columnsToDisplay.pop();
    var index = this.displayedColumns.findIndex(el => el == name);

    var tempList = this.columnsToDisplay.slice(index);    
    
    this.columnsToDisplay.splice(index);
    this.columnsToDisplay.push(this.displayedColumns[index]);

    this.columnsToDisplay.push(...tempList);
    this.columnsToDisplay.push("delete");

  }
  
  removeColumn(name: string) {
    var index = this.columnsToDisplay.findIndex(el => el == name);
    this.columnsToDisplay.splice(index, 1);

  }
}
