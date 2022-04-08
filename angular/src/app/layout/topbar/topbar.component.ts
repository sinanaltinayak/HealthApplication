import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { LayoutModule } from '../layout.module';
import { Patient } from 'src/app/models/patient';
import { Doctor } from 'src/app/models/Doctor';
import { PatientsService } from 'src/app/service/patients.service';
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

  // Error messages
  emailErrorMessage: string = "";
  emailRegisterErrorMessage: string = "";
  passwordErrorMessage: string = "";

  // userType is for determining the accessibility of some features
  userType:string = AppModule.userType;

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
    public myapp: AppComponent, 
    private _router: Router) 
  { }

  // ngOnInit function is called in launch
  ngOnInit(): void {
    this.getAllpatients();
    this.getAllTests();
  }

  // loginUser function is for taking necessary information from the user and trying to find a user with those information.
  loginUser(){

    // tries to find a patient first
    this._patientService.loginPatient(this.email, this.password).snapshotChanges().pipe(map(changes=> changes.map(c=>
      ({id: c.payload.doc.id, 
        fullname: c.payload.doc.data().fullname, 
        email: c.payload.doc.data().email, 
        password: c.payload.doc.data().password, })
      
      )
    )
  ).subscribe(data => { 
    // if there is a patient exist with those values, local and global variables are changed accordingly
    if(data.length != 0){
      this.currentPatient.set(data[0].id, new Patient(data[0].fullname, data[0].email, data[0].password));
      this.userType = "patient";
      AppModule.userPatient = this.currentPatient;
      AppModule.userType = this.userType;
      // welcome message
      this.myapp.openSnackBar("Welcome "+data[0].fullname, "Continue");
      this.myapp.reload("home",150);
    }
    // if there is not a patient, it tries to find a Doctor
    else{
      this._doctorService.loginDoctor(this.email, this.password).snapshotChanges().pipe(map(changes=>changes.map(c=>
        ({id: c.payload.doc.id,
          fullname: c.payload.doc.data().fullname, 
          email: c.payload.doc.data().email, 
          profession: c.payload.doc.data().profession, 
          password: c.payload.doc.data().password,  })
          )
        )
      ).subscribe(data => {
        // if there is a Doctor exist with those values, local and global variables are changed accordingly
        if(data.length != 0){
          this.currentDoctor.set(data[0].id, new Doctor(data[0].fullname, data[0].email, data[0].profession, data[0].password));
          this.userType = "doctor";
          AppModule.userDoctor = this.currentDoctor;
          AppModule.userType = this.userType;
          // gets necessary data from the database
          this.myapp.openSnackBar("Welcome "+data[0].fullname, "Continue");
        }
        // if there is not any user, displays error message
        else{
          this.emailErrorMessage = "Email or password is wrong."
        }
      })
    }
    
  });
  }

  // logoutUser function is for clearing the global variables and heading out to the home page
  logoutUser(){
    if(this._router.url != "/home"){
      this._router.navigate(['home']);
    }
    AppModule.userDoctor = new Map<string, Doctor>();
    AppModule.userPatient = new Map<string, Patient>();
    AppModule.userType = "default";
    this.email = "";
    this.password = "";
    this.emailErrorMessage = "";
    if(this._router.url == "/home"){
      window.location.reload();
    }
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

    // checks for necessary conditions and changes error message variables accordingly
    if(Array.from(this.allPatients.values()).find(x => x.email == this.email)){
      this.emailRegisterErrorMessage = "This user already has an account.";
    }
    else{
      this.emailRegisterErrorMessage = "";
    }
    if(this.password != this.confirmPassword){
      this.passwordErrorMessage = "Passwords do not match."
    }
    else{
      this.passwordErrorMessage = "";
    }

    // if there is not a single error message, it creates a patient account and changes global&local variables
    if(this.emailRegisterErrorMessage == "" && this.passwordErrorMessage == ""){
      let registerpatient = new Patient(this.fullname, this.email, this.password);
      this._patientService.create(registerpatient);
      this._patientService.loginPatient(this.email, this.password).snapshotChanges().pipe(map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          fullname: c.payload.doc.data().fullname, 
          email: c.payload.doc.data().email, 
          password: c.payload.doc.data().password, })
        
        )
      )
    ).subscribe(data => {
      if(data.length != 0){
        this.currentPatient.set(data[0].id, new Patient(data[0].fullname, data[0].email, data[0].password));
        this.userType = "patient";
        AppModule.userPatient = this.currentPatient;
        AppModule.userType = this.userType;
        this.myapp.reload("home",150);
        this.myapp.openSnackBar("Welcome "+data[0].fullname, "Continue");
      }
    });
    }
  }

  // this function is for getting all the patients with their information and storing them globally
  getAllpatients(){
    this._patientService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          fullname: c.payload.doc.data().fullname, 
          email: c.payload.doc.data().email, 
          password: c.payload.doc.data().password, })
        )
      )
    ).subscribe(data => { 
      AppModule.allPatients.clear();
      data.forEach(el=> {
        this.allPatients.set(el.id, new Patient(el.fullname, el.email, el.password));
        AppModule.allPatients.set(el.id, new Patient(el.fullname, el.email, el.password));
        console.log(AppModule.allPatients);
      }
      );
    });
  }

  getAllTests(){

    AppModule.testsInfo = [];

    this._testsService.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          patientID: c.payload.doc.data().patientID,
          date: c.payload.doc.data().date, 
          doctorID: c.payload.doc.data().doctorID, 
          result: c.payload.doc.data().result, 
          symptoms: c.payload.doc.data().symptoms,
        })
        )
      )
    ).subscribe(data => { 
      let result: any[] = [];
      data.forEach(el=> {
        let row = ({
          id: el.id,
          patientID: el.patientID,
          doctorID: el.doctorID, 
          result: this.myapp.parseDiagnosis(el.result), 
          date: el.date, 
          symptoms: el.symptoms
        });
        result.push(row);
        });
      AppModule.testsInfo = result; 
    }); 

  }


}
