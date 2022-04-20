import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Test } from 'src/app/models/test';
import { TestsService } from 'src/app/service/tests.service';
import { map } from 'rxjs';
import { Diagnosis } from 'src/app/models/diagnosis';
import { AppComponent } from 'src/app/app.component';
import { PatientsService } from 'src/app/service/patients.service';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-confirm-test',
  templateUrl: './confirm-test.component.html',
  styleUrls: ['./confirm-test.component.css']
})
export class ConfirmTestComponent implements OnInit {
  

  currentTest = new Map<string, Test>();

  currentPatientName!: string;
  currentDate!: string;

  note!:string;

  displayedColumnsDiagnosis: string[] = ['name'];
  possibleDiagnosis: Diagnosis[] = [];

  displayedColumnsSymptoms: string[] = ['name'];
  symptoms: string[] = [];

  selectedDiagnosisIndex: number = 0;

  constructor(
    public dialog: MatDialogModule,
    public _testsService: TestsService,
    public _patientsService: PatientsService,
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

    this._patientsService.getPatient(Array.from(this.currentTest.values())[0].patientID).valueChanges().subscribe(data => {
      this.currentPatientName = data!.fullname;
    })
  }

  updateTest(note: string){
    this._testsService.update(this.data.testID, Array.from(AppModule.userDoctor.keys())[0], note);
  }
}


