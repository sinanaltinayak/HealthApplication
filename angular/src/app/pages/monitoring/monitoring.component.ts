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
  displayedColumns: string[] = ['Date', 'SystolicBP', 'DiastolicBP', 'Temperature', 'RandomBloodSugarLevel', 'Delete'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  
  dataSourceMonitor: MatTableDataSource<Monitor> = new MatTableDataSource<Monitor>();

  SystolicBP: string = '';
  DiastolicBP: string = '';
  Temperature: string = '';
  RandomBloodSugarLevel: string = '';


  viewControl = this.fb.group({
    SystolicBP:  [Validators.min(50), Validators.max(200)],
    DiastolicBP:  [Validators.min(20), Validators.max(120)],
    Temperature:  [Validators.min(33), Validators.max(45)],
    RandomBloodSugarLevel:  [Validators.min(20), Validators.max(1000)],
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
    let monitor = new Monitor(patientID, Date.now(), Number(this.SystolicBP), Number(this.DiastolicBP), Number(this.Temperature), Number(this.RandomBloodSugarLevel));
   
    this._monitorService.setPatientMonitors(monitor);
    this.SystolicBP =  '';
    this.DiastolicBP =  '';
    this.Temperature =  '';
    this.RandomBloodSugarLevel =  '';
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
    this.columnsToDisplay.push("Delete");

  }
  
  removeColumn(name: string) {
    var index = this.columnsToDisplay.findIndex(el => el == name);
    this.columnsToDisplay.splice(index, 1);

  }
}
