import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface TestResult {
  id: string;
  date: string;
  fastingBG: string;
  postprandialBG: string;
  status: string;
}

const ELEMENT_DATA: TestResult[] = [
  {id: "1", date: '01/08/2021', fastingBG: "110", postprandialBG: '150', status:"Critical"},
  {id: "2", date: '04/08/2021', fastingBG: "140", postprandialBG: '230', status:"Critical"},
  {id: "3", date: '15/08/2021', fastingBG: "90", postprandialBG: '123', status:"Healthy"},
  {id: "4", date: '22/08/2021', fastingBG: "94", postprandialBG: '120', status:"Healthy"},
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-monitoring',
  styleUrls: ['./monitoring.component.css'],
  templateUrl: './monitoring.component.html',
})
export class MonitoringComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'date', 'fastingBG', 'postprandialBG', 'status'];
  dataSource!: MatTableDataSource<TestResult>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
