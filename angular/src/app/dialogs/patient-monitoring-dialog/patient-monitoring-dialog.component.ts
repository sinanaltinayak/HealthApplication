import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Monitor } from 'src/app/models/monitor';
import { MonitorService } from 'src/app/service/monitor.service';

@Component({
  selector: 'app-patient-monitoring-dialog',
  templateUrl: './patient-monitoring-dialog.component.html',
  styleUrls: ['./patient-monitoring-dialog.component.css']
})
export class PatientMonitoringDialogComponent implements OnInit {
  displayedColumns: string[] = ['Date', 'SystolicBP', 'DiastolicBP', 'Temperature', 'RandomBloodSugarLevel'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSourceMonitor: MatTableDataSource<Monitor> = new MatTableDataSource<Monitor>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    public _monitorService: MonitorService
    ,@Inject(MAT_DIALOG_DATA) public data: {patientID: string, patientName: string}) { }

  ngOnInit(): void {
    this.getPatientMonitors();
  }

  getPatientMonitors(){
    this._monitorService.getPatientMonitors(this.data.patientID).valueChanges().subscribe((data: Monitor[]) => {
      console.log(data);
      this.dataSourceMonitor.data = data;
      this.dataSourceMonitor.paginator = this.paginator;
      this.dataSourceMonitor.sort = this.sort;
    });    
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
    var index = this.displayedColumns.findIndex(el => el == name);

    var tempList = this.columnsToDisplay.slice(index);    
    
    this.columnsToDisplay.splice(index);
    this.columnsToDisplay.push(this.displayedColumns[index]);

    this.columnsToDisplay.push(...tempList);

  }
  
  removeColumn(name: string) {
    var index = this.columnsToDisplay.findIndex(el => el == name);
    this.columnsToDisplay.splice(index, 1);

  }
}
