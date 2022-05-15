import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Patient } from 'src/app/models/patient';
import { Doctor } from 'src/app/models/doctor';
import { PatientsService } from 'src/app/service/patients.service';
import { AuthService } from 'src/app/service/auth.service';
import { DoctorsService } from 'src/app/service/doctors.service';
import { TestsService } from 'src/app/service/tests.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  // These variables are for storing the values that are entered in the form fields in HTML file
  email: string = "";
  fullname: string = "";
  password: string = "";
  confirmPassword: string = "";
  hidePassword = true;
  isAuth: boolean = false;

  // Error messages
  emailErrorMessage: string = "";
  emailRegisterErrorMessage: string = "";
  passwordErrorMessage: string = "";

  // userType is for determining the accessibility of some features
  userType:string = localStorage.getItem('role') || 'default'; /* AppModule.userType; */
  name:string = localStorage.getItem('name')! || 'Guest';
  // signMode is for deciding which menu will be shown in the log in part
  signMode:string = "signin";

  constructor(
    public _patientService: PatientsService,
    public _doctorService: DoctorsService,
    public _testsService: TestsService,
    public _authService: AuthService,
    public myapp: AppComponent, 
    private _router: Router) 
  { }

  // ngOnInit function is called in launch
  ngOnInit(): void {
  }
  loginUser(){
    if (this.checkPasswordEmpty() == false) {
      this._authService.login(this.email, this.password);
    }
    else{
      this.myapp.openSnackBar("Password field can not be empty, please fill in.", "Continue");
    }
  }
  
  checkPasswordMatch(password: string, confirmPassword: string){
    if(password == confirmPassword){
      return true;
    }
    else {
      return false;
    }
  }

  refresh(routerLink: string): void {
    console.log(window.location.toString());
    console.log(window.location.toString().endsWith(routerLink));
    console.log(routerLink);
    if (window.location.toString().endsWith(routerLink) == true){
    window.location.reload();
    }
    else {
      this._router.navigate([routerLink]);
    }
}

  checkPasswordEmpty(){
    if(this.password == ""){
      return true;
    }
    else {
      return false;
    }
  }

  logoutUser(){
    this._authService.logout();
    this._router.navigate(['home']).then(a => {window.location.reload()});
    this.userType = "default";
    this.email = "";
    this.password = "";
    this.emailErrorMessage = "";       
    this.myapp.openSnackBar("Successfully logged out.", "Continue");    
  }

  // changeSignMode function is a switch for changing the log in menu
  changeSignMode(){
    if(this.signMode == "signin"){
      this.signMode = "signup";
    }
    else{
      this.signMode = "signin";
    }
    this.email = "";
    this.password = "";
  }
  // registerUser function is for creating a new patient account
  registerUser(){

    if(this.checkPasswordMatch(this.password, this.confirmPassword) == true){
      this._authService.register(this.email, this.password, this.fullname);
      setTimeout(() => {
        if (this._authService.errorInRegister == false){
          this.loginUser();
        }
      },
      1000);      
    }
    else{
      this.myapp.openSnackBar("The passwords does not match, please check again.", "Continue");
    }
  }

}
