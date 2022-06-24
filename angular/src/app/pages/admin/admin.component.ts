import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppComponent } from 'src/app/app.component';
import { Admin } from 'src/app/models/admin';
import { AuthService } from 'src/app/service/auth.service';
import { TestsService } from 'src/app/service/tests.service';
import { RemoveComponent } from './remove/remove.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit {

  emailErrorMessage: string = "Please enter a valid email";
  passwordErrorMessage: string = "Please enter a valid password";
  confirmPasswordErrorMessage: string = "The passwords does not match";
  nameErrorMessage: string = "Please fill in your name";
  displayedColumnsDoctors: string[] = ['id', 'fullname', 'email', 'department', 'rate', 'lastMonth', 'lastYear', 'lastLogin', 'Remove'];
  dataSourceDoctors: MatTableDataSource<Admin> = new MatTableDataSource<Admin>();
  role = localStorage.getItem("role");
  hidePassword = true;
  email: string = "";
  fullname: string = "";
  password: string = "";
  confirmPassword: string = "";
  selectedDepartment: string = "";  
  departments: string[] = ["Dermatology", "Immunology", "Gastroenterology", "Internal Diseases", "Endocrinology", "Chest Diseases", "Neurology",
  "Rheumatology", "Infectious Diseases", "General Surgery", "Cardiology"];

  @ViewChild('paginatorDoctors') paginatorDoctors!: MatPaginator;
  @ViewChild('sortDoctors') sortDoctors!: MatSort;
  @ViewChild('tabs', {static: false}) tabs: any;

  constructor(public _authService: AuthService,
    public _testsService: TestsService,
        public dialog: MatDialog,
        public myapp: AppComponent) { }

  ngAfterViewInit(): void {
    
  this._authService.getAllDoctors().valueChanges({ idField: 'id' }).subscribe((data: Admin[]) => {
    data.forEach(fr=> {
      fr.lastLogin = this.convertDate(fr.lastLogin);
      this.calculateRate(fr.id).then(x => {fr.rate = x});
      this.calLastMonth(fr.id).then(x => {fr.lastMonth = x});
      this.calLastYear(fr.id).then(x => {fr.lastYear = x});
    });
    this.dataSourceDoctors.data = data;
    this.dataSourceDoctors.sort = this.sortDoctors;
  });
      
    this.dataSourceDoctors.paginator = this.paginatorDoctors;
  }

  async calculateRate(id: string){
    let count = 0;
    let rate = 0;
    await this._testsService.getFinalizedTestsByDoctorId(id).get().forEach(fh=>{
      fh.docs.forEach(fr=>{
        if(fr.data().rate != ""){
          count++;        
          rate += Number(fr.data().rate);
        }
      });
    });
    rate = rate / count;

    return rate.toString();
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<Admin>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }  
  }

  async calLastMonth(id: string){
    let count = 0;
    await this._testsService.getFinalizedTestsByDoctorId(id).get().forEach(data => {
      data.docs.forEach(fo=> {
        let date = new Date(fo.data().createdAt);
        let curmonth = new Date().getMonth();
        if(date.getMonth() == curmonth){
          count++;
        }
      });
    });
    return count;
  }

  async calLastYear(id: string){
    let count = 0;
    await this._testsService.getFinalizedTestsByDoctorId(id).get().forEach(data => {
      data.docs.forEach(fo=> {
        let date = new Date(fo.data().createdAt);
        let curyear = new Date().getFullYear();
        if(date.getFullYear() == curyear){
          count++;
        }
      });
    });
    return count;
  }

  registerUser(){
    this._authService.register(this.email, this.password, this.fullname, 'doctor', this.selectedDepartment);
    this.email = "";
    this.fullname = "";
    this.confirmPassword = "";
    this.password = "";
    this.selectedDepartment = "";
  }

  convertDate(date: string){
    let datetime;
    if(Number(date) > 0) {
      datetime = new Date(Number(date)).toLocaleDateString() + " " +  new Date(Number(date)).toLocaleTimeString();
    }
    else {
      datetime = "-"
    }
    return datetime;
  }

  realignInkBar() {
    this.tabs.realignInkBar();
  }

  openRemoveDoctorDialog(doctorID: string, name: string) {    
    const dialogRef = this.dialog.open(RemoveComponent, {
      width: "20%", 
      data: {doctorID: doctorID, name: name},
      hasBackdrop: true,
    });
  }
}
