import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicalHistory } from 'src/app/models/medicalHistory';
import { Patient } from 'src/app/models/patient';
import { User } from 'src/app/models/user';
import { MedicalHistoryService } from 'src/app/service/medicalhistory.service';
import { UserService } from 'src/app/service/user.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Component({
  selector: 'app-patient-information-dialog',
  templateUrl: './patient-information-dialog.component.html',
  styleUrls: ['./patient-information-dialog.component.css']
})
export class PatientInformationDialogComponent implements OnInit {

  currentMedicalHistory: MedicalHistory = new MedicalHistory("","","","","","");
  currentUser: User = new User("","","","","","","","","");

  fileList = new Map<string, string>();
  profileImage: any;

  constructor(
    public dialog: MatDialogModule,
    public _medicalHistoryService: MedicalHistoryService,
    public _userService: UserService,
    private storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: {patientID: string, patientName: string}
  ) { }

  async ngOnInit() {
    this.getCurrentMedicalHistory();
    this.getPatientInformation();

    await this.storage.storage.ref(this.currentUser.profilePicture).getDownloadURL().then(
      (url: string) => {
        this.profileImage = url;
        console.log(this.profileImage);
      }
    )
  }

  getCurrentMedicalHistory(){
    
    this._medicalHistoryService.getMedicalHistory(this.data.patientID).valueChanges().subscribe((data: MedicalHistory) => {
      this.currentMedicalHistory = data;
      console.log(this.currentMedicalHistory);
    });
  }

  getPatientInformation(){
    
    this._userService.getUser(this.data.patientID).valueChanges().subscribe( data => {
      console.log(data);
      this.currentUser = new User(
        this.data.patientID, 
        data?.fullname as string, 
        data?.email as string, 
        data?.password as string, 
        data?.role as string, 
        data?.gender as string, 
        data?.birthday as string, 
        data?.phoneNumber as string, 
        data?.profilePicture as string);
    });
  }

  getDownloadURL(){
    return this.profileImage;
  }

}
