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
  userType:string = localStorage.getItem('role')!; /* AppModule.userType; */
  name:string = localStorage.getItem('name')!;
  // signMode is for deciding which menu will be shown in the log in part
  signMode:string = "signin";

  // these maps store the user information with the format of <"User ID","User Information"> 
  currentDoctor = new Map<string, Doctor>();
  currentPatient = new Map<string, Patient>();
  allPatients = new Map<string, Patient>();

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
    console.log(this.name);
    this._authService.login(this.email, this.password);
    setTimeout(() => {
      window.location.reload();
      this.myapp.openSnackBar("Welcome " +this.name, "Continue");
    },
    1000);
  }  

  logoutUser(){
    this._authService.logout();
    if(this._router.url != "/home"){
      this._router.navigate(['home']);
    }
    this.userType = "default";
    this.email = "";
    this.password = "";
    this.emailErrorMessage = "";       
/*     if(this._router.url == "/home"){
      window.location.reload();
    } */
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

    this._authService.register(this.email, this.password, this.fullname);
/*     this.loginUser(); */
  }

}
