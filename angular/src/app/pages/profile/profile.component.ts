import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestsService } from 'src/app/service/tests.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { MedicalHistory } from 'src/app/models/medicalHistory';
import { MedicalHistoryService } from 'src/app/service/medicalhistory.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  years: number[] = Array(71)
    .fill(1)
    .map((_, idx) => 2021 - idx);

  heightControl = new FormControl('', [
    Validators.max(220),
    Validators.min(100),
  ]);
  weightControl = new FormControl('', [
    Validators.max(300),
    Validators.min(40),
  ]);

  name = '';
  gender = '';
  birthday = '';
  phoneNumber = '';
  height = '';
  weight = '';
  address = '';
  rate = 0;

  currentUserName = localStorage.getItem('name') as string;
  currentUserMail = localStorage.getItem('email') as string;
  currentUserId = localStorage.getItem('id') as string;
  currentUser = new Map<string, User>();
  
  userRole = this.currentUser.get(this.currentUserId)?.role;

  profilePicture = localStorage.getItem('profilePicture') as string;
  profileURL: any;
  inputDepartment = '';
  control: any;
  control2: any;
  date = new FormControl(new Date());
  selectedImage!: any;
  fb!: string;
  downloadURL!: Observable<string>;
  medicalHistory = new Map<string, MedicalHistory>();
  question1 = '';
  question2 = '';
  question3 = '';
  question4 = '';
  question5 = '';
  angularFirestore: any;
  selectedFile: any;
  selectedFile2: any;
  fileList = new Map<string, string>();
  fileLoading = false;
  profilePictureLoading = false;

  constructor(
    public _authService: AuthService,
    public _userService: UserService,
    private _snackBar: MatSnackBar,
    public _testsService: TestsService,
    public _medicalHistoryService: MedicalHistoryService,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

  async ngOnInit() {
    if (localStorage.getItem('role') == 'patient') {
      this.getFileList();
      this._medicalHistoryService
        .getMedicalHistory(this.currentUserId)
        .get()
        .forEach((x) => {
          if (x.exists.valueOf() == true) {
            this._medicalHistoryService
              .getMedicalHistory(this.currentUserId)
              .valueChanges()
              .subscribe((xd) => {
                this.medicalHistory.set(this.currentUserId, xd!);
                this.question1 = Array.from(
                  this.medicalHistory.values()
                )[0].question1;
                this.question2 = Array.from(
                  this.medicalHistory.values()
                )[0].question2;
                this.question3 = Array.from(
                  this.medicalHistory.values()
                )[0].question3;
                this.question4 = Array.from(
                  this.medicalHistory.values()
                )[0].question4;
                this.question5 = Array.from(
                  this.medicalHistory.values()
                )[0].question5;
              });
          }
        });
    }

    this._authService
      .getUser(this.currentUserId)
      .valueChanges()
      .subscribe((data) => {
        this.currentUser.set(this.currentUserId, data!);
        this.name = Array.from(this.currentUser.values())[0].fullname;
        this.gender = Array.from(this.currentUser.values())[0].gender;
        this.birthday = Array.from(this.currentUser.values())[0].birthday;
        this.phoneNumber = Array.from(
          this.currentUser.values()
        )[0].phoneNumber;
        this.height = Array.from(this.currentUser.values())[0].height;
        this.weight = Array.from(this.currentUser.values())[0].weight;
        this.userRole = Array.from(this.currentUser.values())[0].role;
      });

    let count = 0;
    await this._testsService
      .getFinalizedTestsByDoctorId(localStorage.getItem('id')!)
      .get()
      .forEach((fh) => {
        fh.docs.forEach((fr) => {
          if (fr.data().rate != '') {
            count++;
            this.rate += Number(fr.data().rate);
          }
        });
      });
    this.rate = this.rate / count;

    await this.storage.storage
      .ref(this.profilePicture)
      .getDownloadURL()
      .then((url: string) => {
        this.profileURL = url;
      });

    if (this.userRole == 'doctor') {
      this._userService
        .getUser(this.currentUserId)
        .ref.get()
        .then((doc) => {
          this.inputDepartment = doc.get('department');
        });
    }
  }

  saveAccountDetails(
    _name: any,
    _gender: any,
    _birthday: any,
    _phoneNumber: any,
    _height: any,
    _weight: any
  ) {
    
    localStorage.setItem('name', _name);

    this._userService.userRef
      .doc(this.currentUserId)
      .update({
        fullname: _name,
        gender: _gender,
        birthday: _birthday,
        phoneNumber: _phoneNumber,
        height: this.height,
        weight: this.weight,
      });

    this._snackBar.open('Your changes were saved.', 'Continue', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }

  saveMedicalHistory(
    _question1: any,
    _question2: any,
    _question3: any,
    _question4: any,
    _question5: any
  ) {
    let patientID = localStorage.getItem('id')!;

    const followDoc = this.db.collection('medical_history').doc(patientID).ref;
    followDoc.get().then(async (doc: any) => {
      if (doc.exists) {
        await this._medicalHistoryService.MedicalHistoryRef.doc(patientID).update({
          question1: _question1,
          question2: _question2,
          question3: _question3,
          question4: _question4,
          question5: _question5,
        });
      } else {
        let medicalhistory = new MedicalHistory(
          patientID,
          _question1,
          _question2,
          _question3,
          _question4,
          _question5
        );
        this._medicalHistoryService.setMedicalHistory(
          medicalhistory,
          patientID
        );
      }
    });

    this._snackBar.open('Your changes were saved.', 'Continue', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }

  // takes the file uploaded
  async changeProfilePicture(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage.size > 1048576) {
      alert('Please select an image smaller than 1MB');
    } else {
      this.profilePictureLoading = true;
      this.control = 'yes';
      const file = this.selectedImage;
      const name = this.selectedImage.name;
      await this.storage.upload('ProfileImages/' + name, file);
      await this._userService.userRef
        .doc(this.currentUserId)
        .update({ profilePicture: 'ProfileImages/' + name });
      localStorage.setItem('profilePicture', 'ProfileImages/' + name);
      
      this.profilePictureLoading = false;

      window.location.reload();
    }
  }
  
  async removeProfilePicture() {
    await this.storage.storage.ref(this.profilePicture).delete();
    await this._userService.userRef
      .doc(this.currentUserId)
      .update({ profilePicture: 'ProfileImages/default.jpg' });
    localStorage.setItem('profilePicture', 'ProfileImages/default.jpg');
    
    window.location.reload();
  }

  async uploadFile(event: any) {
    let patientID = localStorage.getItem('id')!;
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.size > 1048576) {
      alert('Please select a file smaller than 1MB');
    } else {
      this.fileLoading = true;
      this.control2 = 'yes';
      const file = this.selectedFile;
      const name = this.selectedFile.name;
      await this.storage.upload(patientID + '/' + name, file);

      this.fileLoading = false;
      this.getFileList();
      
      this._snackBar.open('File uploaded.', 'Continue', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary'],
      });
    }

  }

  getFileList() {
    this.fileList.clear();
    const ref = this.storage.ref(this.currentUserId);
    let myurlsubscription = ref.listAll().subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.storage.ref(
          this.currentUserId + '/' + data.items[i].name
        );
        let url = newref.getDownloadURL().subscribe((data) => {
          this.fileList.set(name, data);
        });
      }
    });
  }

  deleteFile(name: string) {
    this.storage.storage.ref(this.currentUserId + '/' + name).delete();

    this.getFileList();
    
    this._snackBar.open('File Deleted.', 'Continue', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }
}
