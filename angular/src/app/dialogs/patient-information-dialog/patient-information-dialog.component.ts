import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicalHistory } from 'src/app/models/medicalHistory';
import { Patient } from 'src/app/models/patient';
import { User } from 'src/app/models/user';
import { MedicalHistoryService } from 'src/app/service/medicalhistory.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-patient-information-dialog',
  templateUrl: './patient-information-dialog.component.html',
  styleUrls: ['./patient-information-dialog.component.css']
})
export class PatientInformationDialogComponent implements OnInit {

  currentMedicalHistory: MedicalHistory = new MedicalHistory("","","","","","");
  currentUser: User = new User("","","","","","","","","");


  constructor(
    public dialog: MatDialogModule,
    public _medicalHistoryService: MedicalHistoryService,
    public _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: {patientID: string, patientName: string}
  ) { }

  ngOnInit(): void {
    this.getCurrentMedicalHistory();
    this.getPatientInformation();
    
  }

  getCurrentMedicalHistory(){
    
    this._medicalHistoryService.getMedicalHistory(this.data.patientID).valueChanges().subscribe((data: MedicalHistory) => {
      this.currentMedicalHistory = data;
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


}
