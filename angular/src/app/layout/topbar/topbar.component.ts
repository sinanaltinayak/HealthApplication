import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PatientsService } from 'src/app/service/patients.service';
import { AuthService } from 'src/app/service/auth.service';
import { DoctorsService } from 'src/app/service/doctors.service';
import { TestsService } from 'src/app/service/tests.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Test } from 'src/app/models/test';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  // These variables are for storing the values that are entered in the form fields in HTML file
  signInEmail: string = "";
  signInPassword: string = "";
  signUpEmail: string = "";
  signUpFullname: string = "";
  signUpPassword: string = "";
  signUpConfirmPassword: string = "";
  hidePassword = true;
  forgotMode: boolean = false;
  currentUser: any = localStorage.getItem('name');
  /* histNotifCount: number = 0; */
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
    public _testsService: TestsService,
    public _chatService: ChatService,
    public _authService: AuthService,
    public myapp: AppComponent, 
    private _router: Router) 
  { }

  // ngOnInit function is called in launch
  ngOnInit(){
    this.myapp.NotifCount = 0;
    this.myapp.NotifCount = this.testHistoryNotification();
  }

  loginUser() {
    this._authService.login(this.signInEmail, this.signInPassword);
  }
  
  forgotPassword() {
    this._authService.resetPassword(this.signInEmail);
  }

  refresh(routerLink: string): void {
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

  logoutUser() {
    this._authService.logout();
    this._router.navigate(['home']).then(a => {window.location.reload()});
    this.userType = "default";
    this.signInEmail = "";
    this.signInPassword = "";
    this.emailErrorMessage = "";       
    this.myapp.openSnackBar("Successfully logged out.", "Continue", 'mat-primary');    
  }

  // changeSignMode function is a switch for changing the log in menu
  changeSignMode() {
    if(this.signMode == "signin"){
      this.signMode = "signup";
    }
    else{
      this.signMode = "signin";
    }
  }
  // registerUser function is for creating a new patient account
  registerUser() {

    this._authService.register(this.signUpEmail, this.signUpPassword, this.signUpFullname);
    setTimeout(() => {
      if (this._authService.errorInRegister == false){
        this.loginUser();
      }
    },
    1000);

    this.changeSignMode();

    this.signInEmail = this.signUpEmail;
    this.signInPassword = this.signUpPassword;

  }
  
  testHistoryNotification() {
/*     if (localStorage.getItem("role")! == 'patient'){
      this._testsService.getTestsByPatientId(localStorage.getItem("id")!).valueChanges({ idField: 'id' }).subscribe((data: Test[]) => {
        data.forEach(el => { 
          if(el.unRead == false) {
            this.histNotifCount++;
          }
        });
      });
    } */
    if (localStorage.getItem("role")! == 'patient'){
      this._testsService.getTestsByPatientId(localStorage.getItem("id")!).get().forEach(d=> {
        d.docs.forEach(a=> {
          if(a.data().unRead == true) {
            this.myapp.NotifCount++;
          }
        });
      });
      this._chatService.getPatientChats(localStorage.getItem("id")!).get().forEach(data => {
        data.forEach(fr=> {
          if(localStorage.getItem("id") != fr.data().messages.pop()?.senderID){
            if(fr.data().unRead == true){
              this.myapp.NotifCount++;
            }
          }
        });
      });
    }
    if(localStorage.getItem("role")! == "doctor"){
      this._chatService.getDoctorChats(localStorage.getItem("id")!).get().forEach(data => {
        data.forEach(fr=> {
          if(localStorage.getItem("id") != fr.data().messages.pop()?.senderID){
            if(fr.data().unRead == true){
              this.myapp.NotifCount++;
            }
          }
        });
      });
    }
    return this.myapp.NotifCount;
  }

  openSnackBar() {
    this.myapp.openSnackBar("Flags indicate nearby hospitals around your location.", "Continue", 'mat-primary');    
  }

}
