import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { LayoutModule } from '../layout.module';
import { Patient } from 'src/app/models/patient';
import { Doctor } from 'src/app/models/doctor';
import { PatientsService } from 'src/app/service/patients.service';
import { AuthService } from 'src/app/service/auth.service';
import { map } from 'rxjs/operators';
import { DoctorsService } from 'src/app/service/doctors.service';
import { TestsService } from 'src/app/service/tests.service';
import { Test } from 'src/app/models/test';
import { Diagnosis } from 'src/app/models/diagnosis';
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
  userType:string = AppModule.userType; /* AppModule.userType; */
  name:string = "";
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
    if(localStorage.getItem("email") == null){

    }
    else{
      this.email = localStorage.getItem("email")!;
      this.password = localStorage.getItem("password")!;
      this.loginUser();      
    }
  }
  loginUser(){
    this._authService.login(this.email, this.password);
    this._authService.getRole(this.email).then(d=> {
      this.userType = d.valueOf();
    });
    this._authService.getName(this.email).then(n=> {
      this.name = n.valueOf();
      this.myapp.openSnackBar("Welcome " +this.name, "Continue");
    });
/*     this._router.navigate(['home']); */
/*     this.myapp.reload("home",150); */
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
