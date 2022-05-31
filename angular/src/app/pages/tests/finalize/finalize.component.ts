import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Test } from 'src/app/models/test';
import { TestsService } from 'src/app/service/tests.service';
import { Diagnosis } from 'src/app/models/diagnosis';
import { PatientsService } from 'src/app/service/patients.service';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit {
  
  myControl = new FormControl();

  diagnoses: string[] = ["Fungal infection","Allergy","GERD","Chronic cholestasis","Drug reaction","Peptic ulcer diseae","AIDS","Diabetes","Gastroenteritis","Bronchial asthma","Hypertension","Migraine","Cervical spondylosis","Paralysis (Brain Hemorrhage)","Jaundice","Malaria","Chicken pox","Dengue","Typhoid","Hepatitis A","Hepatitis B","Hepatitis C","Hepatitis D","Hepatitis E","Alcoholic hepatitis","Tuberculosis","Common cold","Pneumonia","Dimorphic Hemmorhoids (Piles)","Hearth Attack","Varicose veins","Hypothyroidism","Hypoglycemia","Osteoarthristis","Arthritis","(Vertigo) Paroynmsal Positional Vertigo","Acne","Urinary tract infection","Psoriasis","Impetigo"];
  currentTest = new Map<string, Test>();
  currentPatientName!: string;
  currentDate!: string;

  note!:string;

  displayedColumnsDiagnosis: string[] = ['name'];
  possibleDiagnosis: Diagnosis[] = [];

  displayedColumnsSymptoms: string[] = ['name'];
  symptoms: string[] = [];

  selectedDiagnosis: string = "";

  constructor(
    public dialog: MatDialogModule,
    public _testsService: TestsService,
    public _patientsService: PatientsService,
    public _authService: AuthService,
    public chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: {testID: string}
  ) { }

  ngOnInit(): void {
    this._testsService.getTestByID(this.data.testID).valueChanges().subscribe(xd => {
      
      this.currentTest.set(this.data.testID, xd!);
      this.symptoms = this.parseSymptoms(Array.from(this.currentTest.values())[0].symptoms);
      this.possibleDiagnosis = this.parseDiagnosis(Array.from(this.currentTest.values())[0].resultString);
      this.getPatient();
      this.currentDate = Array.from(this.currentTest.values())[0].date;
    });

  }

  
  parseDiagnosis(txt: string){
    let diagnosisList: Diagnosis[] = [];

    let textSplitted = txt.split("&");

    for(let i = 0; i< textSplitted.length; i++){
      let textSplittedSplitted = textSplitted[i].split(",");
      diagnosisList.push(new Diagnosis(textSplittedSplitted[0], parseFloat(textSplittedSplitted[1])));
    }
    
    return diagnosisList;
  }

  parseSymptoms(txt: string){
    let symptomList = []

    let textSplitted = txt.split(",");

    for(let i = 0; i< textSplitted.length; i++){
      symptomList.push(textSplitted[i]);
    }

    return symptomList;
  }

  getPatient(){

    this._authService.getUser(Array.from(this.currentTest.values())[0].patientID).valueChanges().subscribe(data=> {
      this.currentPatientName = data!.fullname;
    });
  }

  getPatientId(){
    return this.currentTest.get(this.data.testID)?.patientID as string;
  }

  getTestId(){
    return this.data.testID;
  }

  updateTest(){
    this._testsService.update(this.data.testID, localStorage.getItem('id')!);
/*     this._testsService.updateFinalDiagnosis(this.data.testID, this.selectedValue!); */
    this._testsService.getTestByID(this.data.testID).update({unRead : true});
    this._testsService.updateFinalDiagnosis(this.data.testID, this.selectedDiagnosis!);

  }

  changeSelectedDiagnosis(name: string){
    this.selectedDiagnosis = name;
  }
}


