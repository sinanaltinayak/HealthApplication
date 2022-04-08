import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Test } from 'src/app/models/test';
import { TestsService } from 'src/app/service/tests.service';
import { map } from 'rxjs';
import { Diagnosis } from 'src/app/models/diagnosis';

@Component({
  selector: 'app-confirm-test',
  templateUrl: './confirm-test.component.html',
  styleUrls: ['./confirm-test.component.css']
})
export class ConfirmTestComponent implements OnInit {
  

  currentTest = new Map<string, Test>();

  displayedColumns: string[] = ['name'];
  possibleDiagnosis: Diagnosis[] = [];
  selectedDiagnosisIndex: number = 0;

  constructor(
    public dialog: MatDialogModule,
    public _service: TestsService,
    @Inject(MAT_DIALOG_DATA) public data: {testID: string}
  ) { }

  ngOnInit(): void {
    console.log(this.currentTest);
    this.getTest();
    console.log("xd",this.data.testID)
  }

  // function for finding the announcement data from its id
  getTest(){
    this._service.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          patientID: c.payload.doc.data().patientID,
          doctorID: c.payload.doc.data().doctorID, 
          date: c.payload.doc.data().date, 
          symptoms: c.payload.doc.data().symptoms, 
          result: c.payload.doc.data().result, 
        })
        )
      )
    ).subscribe(data => { 
      data.forEach(el=> {
        console.log("el", el.id, "data", this.data.testID);
        if (el.id == this.data.testID) {
          this.currentTest.set(el.id, new Test(el.patientID, el.doctorID, el.date, el.symptoms, el.result));
          this.possibleDiagnosis = this.parseDiagnosis(el.result);
        }
        }
      );
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

}


