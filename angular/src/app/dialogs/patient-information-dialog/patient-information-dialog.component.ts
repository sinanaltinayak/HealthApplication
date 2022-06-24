import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicalHistory } from 'src/app/models/medicalHistory';
import { Patient } from 'src/app/models/patient';
import { User } from 'src/app/models/user';
import { MedicalHistoryService } from 'src/app/service/medicalhistory.service';
import { UserService } from 'src/app/service/user.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patient-information-dialog',
  templateUrl: './patient-information-dialog.component.html',
  styleUrls: ['./patient-information-dialog.component.css']
})
export class PatientInformationDialogComponent implements OnInit {

  currentMedicalHistory: MedicalHistory = new MedicalHistory("","","","","","");
  currentUser: User = new User("","","","","","","","","","","");



  fileList = new Map<string, string>();
  profileImage: any;

  constructor(
    public dialog: MatDialogModule,
    public _medicalHistoryService: MedicalHistoryService,
    public _userService: UserService,
    private storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: {patientID: string, patientName: string}
  ) { }

  ngOnInit() {
    this.getCurrentMedicalHistory();
    this.getPatientInformation();
    this.getFileList();    
  }

  getCurrentMedicalHistory(){
    
    this._medicalHistoryService.getMedicalHistory(this.data.patientID).valueChanges().subscribe( data => {
      this.currentMedicalHistory = data as MedicalHistory
    });
  }

  getPatientInformation(){
    
    this._userService.getUser(this.data.patientID).valueChanges().subscribe( data => {
      this.currentUser = new User(
        this.data.patientID, 
        data?.fullname as string, 
        data?.email as string, 
        data?.password as string, 
        data?.role as string, 
        data?.gender as string, 
        data?.birthday as string, 
        data?.phoneNumber as string, 
        data?.profilePicture as string,
        data?.height as string, 
        data?.weight as string);

        this.storage.storage.ref(this.currentUser.profilePicture).getDownloadURL().then(
          (url: string) => {
            this.profileImage = url;
          }
        )
    });
  }

  getDownloadURL(){
    return this.profileImage;
  }

  getFileList() {
    const ref = this.storage.ref(this.data.patientID);
    let myurlsubscription = ref.listAll().subscribe((data) => {

      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.storage.ref(this.data.patientID + '/' + data.items[i].name);
        let url = newref.getDownloadURL().subscribe((data) => {
          this.fileList.set(
            name, data
          );
        });
      }
      
    });
  }

}
