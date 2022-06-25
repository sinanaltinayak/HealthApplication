import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom, map, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Admin } from '../models/admin';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: string = "";
  name: string = "";
  department: string = "";
  profilePicture: string = ""; 
  errorInRegister: boolean = false;
  constructor(
    private _snackBar: MatSnackBar,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {}

    async login(email: string, password: string) {

      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(async value => {
        let v = value.user?.emailVerified; /* value.user?.emailVerified; --> copy paste this command to v variable to activate the login with verified emails  */
        if (v == true) {
          localStorage.setItem('id',value.user!.uid);
          const user$ =  this.db.collection('/user_roles').doc(value.user!.uid).snapshotChanges().pipe(take(1));
          this.role = (await firstValueFrom(user$)).payload.get("role");
          this.name = (await firstValueFrom(user$)).payload.get("fullname");
          this.profilePicture = (await firstValueFrom(user$)).payload.get("profilePicture");
          this.db.collection('user_roles').doc(value.user?.uid).update({
            password: password, lastLogin: Date.now()
          });
          this._snackBar.open("Welcome " +this.name, "Continue", {
            horizontalPosition: "right",
            verticalPosition: "bottom",
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          localStorage.setItem('role', this.role);
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('name', this.name);
          localStorage.setItem('profilePicture', this.profilePicture);
          
          if(this.role == 'doctor'){
            this.router.navigate(['tests']);
            this.department = (await firstValueFrom(user$)).payload.get("department");
            localStorage.setItem('department', this.department);
          }
          if(this.role == 'admin'){
            this.router.navigate(['admin']);
          }
          if(this.role == 'patient' || this.role == 'disabled'){
            setTimeout(() => {
              window.location.reload();
            },
            500); 
          } 
        }
        else {
          value.user?.sendEmailVerification();
          this._snackBar.open("Your account is not verified, please verify your account.", "Continue", {
            horizontalPosition: "right",
            verticalPosition: "bottom",
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });          
        }      
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
        if (err.message.includes("Firebase: There is no user record corresponding to this identifier.")){
          setTimeout(() => {
            this._snackBar.open("There is no user corresponding to this email address.", "Continue", {
              horizontalPosition: "right",
              verticalPosition: "bottom",
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-primary']
            }); 
          },
          150);
        }
        else if (err.message.includes("Firebase: The password is invalid or the user does not have a password.")){
          setTimeout(() => {
            this._snackBar.open("The password is invalid", "Continue", {
              horizontalPosition: "right",
              verticalPosition: "bottom",
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-primary']
            }); 
          },
          150);
        }
        else if (err.message.includes("The email address is badly formatted.")) {
          setTimeout(() => {
            this._snackBar.open("The email address is badly formatted.", "Continue", {
              horizontalPosition: "right",
              verticalPosition: "bottom",
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-primary']
            }); 
          },
          150);
        }
        else {
          this._snackBar.open("Authentication failed, please try again.", "Continue", {
            horizontalPosition: "right",
            verticalPosition: "bottom",
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        }
      });
    }

    resetPassword(email: string){

      this.afAuth.sendPasswordResetEmail(email).then(value => {
        this._snackBar.open("The reset link is sent to your email address, please check.", "Continue", {
          horizontalPosition: "right",
          verticalPosition: "bottom",
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
      }).catch(err => {
        console.log(err.message);
        if (err.message.includes("Firebase: There is no user record corresponding to this identifier.")){
          this._snackBar.open("There is no user corresponding to this email address.", "Continue", {
            horizontalPosition: "right",
            verticalPosition: "bottom",
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        }
        else if (err.message.includes("The email address is badly formatted")) {
          this._snackBar.open("The email address is badly formatted.", "Continue", {
            horizontalPosition: "right",
            verticalPosition: "bottom",
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          }); 
        }
      });
    }

    register(email: string, password: string, name: string, role: string  = "patient", department: string = "") {

      this.afAuth.createUserWithEmailAndPassword(email, password).then(value => {
        value.user?.sendEmailVerification();
        this.errorInRegister = false;
        this.db.collection('user_roles').doc(value.user?.uid).set({
          email: email,
          fullname: name,
          password: password,
          role: role,
          department: department,
          gender: '',
          birthday: '',
          phoneNumber: '',
          profilePicture: 'ProfileImages/default.jpg',
          height: '',
          weight: ''
        });
      }).catch(err => {
        this.errorInRegister = true;
        
        if(err.message.includes("Password should be at least 6 characters")) {
          setTimeout(() => {
            this._snackBar.open("Password must be at least 6 characters.", "Continue", {
              horizontalPosition: "right",
              verticalPosition: "bottom",
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-primary']
            }); 
          },
          150);         
        }
        else if (err.message.includes("The email address is already in use by another account")){
          setTimeout(() => {
            this._snackBar.open("The email address is already in use by another account.", "Continue", {
              horizontalPosition: "right",
              verticalPosition: "bottom",
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-primary']
            }); 
          },
          150);
        }
        else if (err.message.includes("The email address is badly formatted")) {
          setTimeout(() => {
            this._snackBar.open("The email address is badly formatted.", "Continue", {
              horizontalPosition: "right",
              verticalPosition: "bottom",
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-primary']
            }); 
          },
          150);
        }
      })
    }

    getUser(id: string): AngularFirestoreDocument<any>{
      
      return this.db.collection('/user_roles').doc(id);
    }

    getAllDoctors(): AngularFirestoreCollection<Admin>{
      
      return this.db.collection('/user_roles', ref => ref.where('role', '==', 'doctor'));
    }

    logout() {
      localStorage.clear();
      this.afAuth.signOut().then(() => {
        console.log('Logged out');
      });
      localStorage.setItem('role', "default");
    }
    
}