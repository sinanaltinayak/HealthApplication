import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PatientsService } from 'src/app/service/patients.service';
import { AuthService } from 'src/app/service/auth.service';
import { DoctorsService } from 'src/app/service/doctors.service';
import { TestsService } from 'src/app/service/tests.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  forgotMode: boolean = false;
  currentUser: any = localStorage.getItem('name');

  @ViewChild('search', {static: false})
  inputElement: ElementRef | undefined;

  // Error messages
  emailErrorMessage: string = "Please enter a valid email";
  passwordErrorMessage: string = "Please enter a valid password";
  confirmPasswordErrorMessage: string = "The passwords does not match";
  nameErrorMessage: string = "Please fill in your name";
  // userType is for determining the accessibility of some features
  userType:string = localStorage.getItem('role') || 'default'; /* AppModule.userType; */
  name:string = localStorage.getItem('name')! || 'Guest';
  // signMode is for deciding which menu will be shown in the log in part
  signMode:string = "signin";

  constructor(
    public _authService: AuthService,
    public myapp: AppComponent, 
    private _router: Router) 
  { }

  // ngOnInit function is called in launch
  ngOnInit(): void {

    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     const uid = user.uid;
    //     this._authService.getUser(uid).valueChanges().subscribe(data=> {
    //       this.currentUser = data!.fullname;
    //     });
    //   } else {
    //   }
    // });

  }
  loginUser(){
    this._authService.login(this.email, this.password);
  }
  

  forgotPassword(){
    this._authService.resetPassword(this.email);
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

menuOpened() {
  setTimeout(() => {
    this.inputElement!.nativeElement.focus();
  }, 0);
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

    this._authService.register(this.email, this.password, this.fullname);
    setTimeout(() => {
      if (this._authService.errorInRegister == false){
        this.loginUser();
      }
    },
    1000);

  }

}
