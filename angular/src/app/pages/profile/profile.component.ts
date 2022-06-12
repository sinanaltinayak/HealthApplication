import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestsService } from 'src/app/service/tests.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from 'rxjs';
import { MedicalHistory } from 'src/app/models/medicalHistory';
import { MedicalHistoryService } from 'src/app/service/medicalhistory.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  years: number[] = Array(71).fill(1).map((_, idx) => 2021 - idx)
  
  heightControl = new FormControl("", [Validators.max(220), Validators.min(100)])
  weightControl = new FormControl("", [Validators.max(300), Validators.min(40)])

  name= "";
  gender = "";
  birthday = "";
  phoneNumber= "";
  height = "";
  weight= "";
  address= "";
  rate = 0;
  
  currentUserName = localStorage.getItem('name') as string;
  currentUserMail = localStorage.getItem('email') as string;
  currentUserId = localStorage.getItem('id') as string;
  currentUser = new Map<string, User>();
  inputName = this.currentUser.get(this.currentUserId)?.fullname;
  inputMail = this.currentUser.get(this.currentUserId)?.email;
  inputGender = this.currentUser.get(this.currentUserId)?.gender;
  inputBirthday = this.currentUser.get(this.currentUserId)?.birthday;
  inputPhoneNumber = this.currentUser.get(this.currentUserId)?.phoneNumber;
  inputHeight = this.currentUser.get(this.currentUserId)?.height;
  inputWeight = this.currentUser.get(this.currentUserId)?.weight;
  userRole = this.currentUser.get(this.currentUserId)?.role;
  profilePicture = localStorage.getItem('profilePicture') as string;
  inputDepartment = "";
  control: any;
  control2: any;
  date = new FormControl(new Date());
  selectedImage!: any;
  fb!: string;
  downloadURL!: Observable<string>;
  profileImage: any;
  medicalHistory = new Map<string, MedicalHistory>();
  question1 = "";
  question2 = "";
  question3 = "";
  question4 = "";
  question5 = "";
  inputQuestion1 = this.medicalHistory.get(this.currentUserId)?.question1;
  inputQuestion2 = this.medicalHistory.get(this.currentUserId)?.question2;
  inputQuestion3 = this.medicalHistory.get(this.currentUserId)?.question3;
  inputQuestion4 = this.medicalHistory.get(this.currentUserId)?.question4;
  inputQuestion5 = this.medicalHistory.get(this.currentUserId)?.question5;
  angularFirestore: any;
  selectedFile: any;
  selectedFile2: any;
  fileList = new Map<string, string>();

  constructor(
    public _authService: AuthService,
    public _userService: UserService,
    private _snackBar: MatSnackBar,
    public _testsService: TestsService,
    public _medicalHistoryService: MedicalHistoryService,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
   
   }

  async ngOnInit() {

    if(localStorage.getItem("role") == 'patient'){
      this.getFileList();
      this._medicalHistoryService.getMedicalHistory(this.currentUserId).get().forEach(x=> {
        if(x.exists.valueOf() == true){
          this._medicalHistoryService.getMedicalHistory(this.currentUserId).valueChanges().subscribe(xd => {
            this.medicalHistory.set(this.currentUserId, xd!);
            this.inputQuestion1 =  Array.from(this.medicalHistory.values())[0].question1;
            this.inputQuestion2 =  Array.from(this.medicalHistory.values())[0].question2;
            this.inputQuestion3 = Array.from(this.medicalHistory.values())[0].question3;
            this.inputQuestion4 = Array.from(this.medicalHistory.values())[0].question4;
            this.inputQuestion5 = Array.from(this.medicalHistory.values())[0].question5;
          });
        }
      });
    }

    this._authService.getUser(this.currentUserId).valueChanges().subscribe(xd => {
      this.currentUser.set(this.currentUserId, xd!);
      this.inputName =  Array.from(this.currentUser.values())[0].fullname;
      this.inputMail =  Array.from(this.currentUser.values())[0].email;
      this.inputGender = Array.from(this.currentUser.values())[0].gender;
      this.inputBirthday = Array.from(this.currentUser.values())[0].birthday;
      this.inputPhoneNumber = Array.from(this.currentUser.values())[0].phoneNumber;
      this.inputHeight = Array.from(this.currentUser.values())[0].height;
      this.inputWeight = Array.from(this.currentUser.values())[0].weight;
      this.userRole = Array.from(this.currentUser.values())[0].role;
    });
    
    let count = 0;
    await this._testsService.getFinalizedTestsByDoctorId(localStorage.getItem("id")!).get().forEach(fh=>{
      fh.docs.forEach(fr=>{
        if(fr.data().rate != ""){
          count++;        
          this.rate += Number(fr.data().rate);
        }
      });
    });
    this.rate = this.rate / count;
    
    await this.storage.storage.ref(this.profilePicture).getDownloadURL().then(
      (url: string) => {
        this.profileImage = url;
      }
    )

    if(this.userRole == 'doctor'){
      this._userService.getUser(this.currentUserId).ref.get().then((doc) => {
      this.inputDepartment = doc.get("department");});
    }

  }


  saveChanges(_name: any, _gender: any, _birthday: any, _phoneNumber: any, _height: any, _weight: any){
      
      if(_name == "") {
        _name = this.currentUser.get(this.currentUserId)?.fullname;
      }
      if(_gender == "") {
        _gender = this.currentUser.get(this.currentUserId)?.gender;
      }
      if(_birthday == "") {
        _birthday = this.currentUser.get(this.currentUserId)?.birthday;
      }
      if(_phoneNumber == "") {
        _phoneNumber = this.currentUser.get(this.currentUserId)?.phoneNumber;
      }
      if(_height == "") {
        _phoneNumber = this.currentUser.get(this.currentUserId)?.phoneNumber;
      }
      if(_weight == "") {
        _phoneNumber = this.currentUser.get(this.currentUserId)?.phoneNumber;
      }
      localStorage.setItem('name', _name)
      
      this._userService.userRef.doc(this.currentUserId).update({fullname:_name, gender: _gender, birthday: _birthday, phoneNumber: _phoneNumber, height: _height, weight: _weight });
    
      this._snackBar.open("Your changes were saved." , "Continue", {
        horizontalPosition: "right",
        verticalPosition: "bottom",
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }

    saveChanges2(_question1: any, _question2: any, _question3: any, _question4: any, _question5: any){
      let patientID = localStorage.getItem("id")!;


        const followDoc = this.db.collection('medical_history').doc(patientID).ref;
        followDoc.get().then((doc:any) => {
          if (doc.exists) {

            if(_question1 == "") {
              _question1 = this.medicalHistory.get(this.currentUserId)?.question1;
            }
            if(_question2 == "") {
              _question2 = this.medicalHistory.get(this.currentUserId)?.question2;
            }
            if(_question3 == "") {
              _question3 = this.medicalHistory.get(this.currentUserId)?.question3;
            }
            if(_question4 == "") {
              _question4 = this.medicalHistory.get(this.currentUserId)?.question4;
            }
            if(_question5 == "") {
              _question5 = this.medicalHistory.get(this.currentUserId)?.question5;
            }

            this._medicalHistoryService.MedicalHistoryRef.doc(patientID).update({question1: _question1, question2: _question2, question3: _question3, question4: _question4, question5: _question5})
            
          } else {
            let medicalhistory = new MedicalHistory(patientID, _question1, _question2, _question3, _question4, _question5);
            this._medicalHistoryService.setMedicalHistory(medicalhistory, patientID);
          }
        })

    
    
      this._snackBar.open("Your changes were saved." , "Continue", {
        horizontalPosition: "right",
        verticalPosition: "bottom",
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }
     
     refresh(){
      window.location.reload();
     }

     // takes the file uploaded
    onFileSelected(event: any) {
      this.selectedImage = event.target.files[0];
      if(this.selectedImage.size > 1048576 ){
        alert("Please select an image smaller than 1MB");
     }
     else{
      this.control = "yes";
      const file = this.selectedImage;
      const name = this.selectedImage.name;
      this.storage.upload('ProfileImages/'+name, file);
      this._userService.userRef.doc(this.currentUserId).update({profilePicture: 'ProfileImages/'+name});
      localStorage.setItem('profilePicture', 'ProfileImages/'+name);
    }
    }

    onFileSelected2(event: any) {
      let patientID = localStorage.getItem("id")!;
      this.selectedFile = event.target.files[0];
      if(this.selectedFile.size > 1048576 ){
        alert("Please select a file smaller than 1MB");
     }
     else{
      this.control2 = "yes";
      const file = this.selectedFile;
      const name = this.selectedFile.name;
      this.storage.upload(patientID + '/' + name, file);
     }

    }

    // gets the url of the necessary picture
    getDownloadURL(){
      return this.profileImage;
    }


    getFileList() {
      const ref = this.storage.ref(this.currentUserId);
      let myurlsubscription = ref.listAll().subscribe((data) => {
        for (let i = 0; i < data.items.length; i++) {
          let name = data.items[i].name;
          let newref = this.storage.ref(this.currentUserId + '/' + data.items[i].name);
          let url = newref.getDownloadURL().subscribe((data) => {
            this.fileList.set(
              name, data
            );
          });
        }
      });
    }

    delete(name: string) {
      return this.storage.storage.ref(this.currentUserId + '/' + name).delete();
    }

  }



