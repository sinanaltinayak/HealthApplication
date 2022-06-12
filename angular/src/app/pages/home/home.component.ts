import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FlaskService } from '../../service/flask.service';
import { Diagnosis } from 'src/app/models/diagnosis';

import {MatTable} from '@angular/material/table';
import { TestsService } from 'src/app/service/tests.service';
import { Test } from 'src/app/models/test';
import { AppModule } from 'src/app/app.module';
import { DiagnosisService } from 'src/app/service/diagnosis.service';
import { DepartmentService } from 'src/app/service/department.service';
import { DiagnosisInformation } from 'src/app/models/diagnosisInformation';
import { AppComponent } from 'src/app/app.component';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

export interface SymptomOption {
  symptom: string;
  value: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  myControl = new FormControl();
  role = localStorage.getItem('role');
  options: string[] = ["Itching", "Skin Rash", "Nodal Skin Eruptions", "Continuous Sneezing", "Shivering", "Chills", "Joint Pain", "Stomach Pain", "Acidity", "Ulcers on Tongue", "Muscle Wasting", "Vomiting", "Burning Micturition", "Spotting Urination", "Fatigue", "Weight Gain", "Anxiety", "Cold Hands and Feets", "Mood Swings", "Weight Loss", "Restlessness", "Lethargy", "Patches in Throat", "Irregular Sugar Level", "Cough", "High Fever", "Sunken Eyes", "Breathlessness", "Sweating", "Dehydration", "Indigestion", "Headache", "Yellowish Skin", "Dark Urine", "Nausea", "Loss Of Appetite", "Pain Behind The Eyes", "Back Pain", "Constipation", "Abdominal Pain", "Diarrhoea", "Mild Fever", "Yellow Urine", "Yellowing of Eyes", "Acute Liver Failure", "Fluid Overload", "Swelling Of Stomach", "Swelled Lymph Nodes", "Malaise", "Blurred and Distorted Vision", "Phlegm", "Throat Irritation", "Redness Of Eyes", "Sinus Pressure", "Runny Nose", "Congestion", "Chest Pain", "Weakness in Limbs", "Fast Heart Rate", "Pain During Bowel Movements", "Pain in Anal Region", "Bloody Stool", "Irritation in Anus", "Neck Pain", "Dizziness", "Cramps", "Bruising", "Obesity", "Swollen Legs", "Swollen Blood Vessels", "Puffy Face and Eyes", "Enlarged Thyroid", "Brittle Nails", "Swollen Extremeties", "Excessive Hunger", "Extra Marital Contacts", "Drying and Tingling Lips", "Slurred Speech", "Knee Pain", "Hip Joint Pain", "Muscle Weakness", "Stiff Neck", "Swelling Joints", "Movement Stiffness", "Spinning Movements", "Loss Of Balance", "Unsteadiness", "Weakness Of One Body Side", "Loss Of Smell", "Bladder Discomfort", "Foul Smell Ofurine", "Continuous Feel Of Urine", "Passage Of Gases", "Internal Itching", "Toxic Look (Typhos)", "Depression", "Irritability", "Muscle Pain", "Altered Sensorium", "Red Spots Over Body", "Belly Pain", "Abnormal Menstruation", "Dischromic Patches", "Watering From Eyes", "Increased Appetite", "Polyuria", "Family History", "Mucoid Sputum", "Rusty Sputum", "Lack Of Concentration", "Visual Disturbances", "Receiving Blood Transfusion", "Receiving Unsterile Injections", "Coma", "Stomach Bleeding", "Distention Of Abdomen", "History Of Alcohol Consumption", "Fluid Overload", "Blood in Sputum", "Prominent Veins On Calf", "Palpitations", "Painful Walking", "Pus Filled Pimples", "Blackheads", "Scurring", "Skin Peeling", "Silver Like Dusting", "Small Dents in Nails", "Inflammatory Nails", "Blister", "Red Sore Around Nose", "Yellow Crust Ooze", "Prognosis"];
  years: number[] = Array(71).fill(1).map((_, idx) => 2021 - idx)
  filteredOptions!: Observable<string[]>;
  selectedSymptoms: string[] = [];
  
  diagnosisDescription!: string;
  selectedGender = "";
  selectedYear = "";
  testLimit: boolean = false;
  limitedTestNumber = 3;
  selectedSymptomsIndex: Array<number> = new Array<number>(132).fill(0);

  displayedColumns: string[] = ['name'];
  possibleDiagnosis: Diagnosis[] = [];
  possibleDiagnosisInformation: DiagnosisInformation[] = [new DiagnosisInformation("","","",[])];
  selectedDiagnosisIndex: number = 0;

  showLoaderResult: boolean = false;
  
  @ViewChild(MatTable) table!: MatTable<Diagnosis>;
  @ViewChild('symptomInput') symptomInput!: ElementRef<HTMLInputElement>;

  constructor( 
    public _service: FlaskService, 
    public _serviceDepartment: DepartmentService,
    public _serviceTests: TestsService,
    public _diagnosisService: DiagnosisService,
    public _formBuilder: FormBuilder,
    public myapp: AppComponent) 
  {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(null),
      map((symptom: string | null) => (symptom ? this._filter(symptom) : this.options.slice())),
    );
  }
  
  async ngOnInit(): Promise<void> {
    //function for if user have already a pending test
    await this._serviceTests.getPendingTestsByPatientId(localStorage.getItem("id")!).get().forEach(data=> {
      if (data.size < this.limitedTestNumber){
        this.testLimit = false;
      }
      else{
        this.testLimit = true;
      } 
    });
    if (this.role == 'disabled'){
      this.myapp.openSnackBar("This account is disabled.", "Continue", "mat-primary");
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  selected(event: MatAutocompleteSelectedEvent): void {

    if(this.selectedSymptoms.indexOf(event.option.viewValue) !== -1) {
      console.log('Already exist');
      this.myControl.setValue(null); 
    }
    else {
      this.selectedSymptoms.push(event.option.viewValue);
      this.selectedSymptomsIndex[this.options.indexOf(event.option.value)] = 1;
  
      // loginleyince matoptionların sayıları değişiyor, selectedSymptomsIndex bozuluyor
      //this.selectedSymptomsIndex[Number(event.option.id.slice(11))-2] = 1;
      
      this.symptomInput.nativeElement.value = '';
      this.myControl.setValue(null);      
    }    
  }

  remove(symptom: string): void {
    const index = this.selectedSymptoms.indexOf(symptom);
    
    const finder = (element: any) => element == symptom;

    var result = this.options.findIndex(finder);

    this.selectedSymptomsIndex[result] = 0;


    if (index >= 0) {
      this.selectedSymptoms.splice(index, 1);
    }
  }

  getResult(){
    this.showLoaderResult = true;
    let diagnosis: Diagnosis[] = [];
   
    // let subscribeData = this._service.getResult(this.selectedSymptomsIndex).subscribe( data => {
    //   console.log(data);
    // })
    
    this._service.getResult(this.selectedSymptomsIndex).subscribe(
      data => { 
        for ( let i = 0; i < Object.values(data).length; i++){
          diagnosis.push( new Diagnosis(Object.values(data)[i][0], Object.values(data)[i][1]))
        }
        this.possibleDiagnosis = diagnosis;
        
        this.possibleDiagnosisInformation = [];
        for ( let i = 0; i < diagnosis.length; i++){
          this.possibleDiagnosisInformation.push(this._diagnosisService.getDiagnosisInformation(diagnosis[i].name));
        }

        this.showLoaderResult = false;
      }
    );
    this.table.renderRows();
    this.selectedDiagnosisIndex = 0;

  }

  recordTest(){
    if(localStorage.getItem('role') == "patient"){
      let dep = this._diagnosisService.getDiagnosisInformation(this.possibleDiagnosis[0].name)?.department as string;
      let newTest = new Test(localStorage.getItem('id')!, "", "", Date.now(), this.selectedSymptoms.toString(), this.diagnosisListToString(this.possibleDiagnosis), "", dep)
      this._serviceTests.create(newTest);
    }
    this.myapp.openSnackBar("Test has been created! Visit test history page.","Continue",'mat-primary')
  }

  diagnosisListToString(list: Diagnosis[]){
    let result = "";
    for(let i = 0; i< list.length; i++){
      if(i != list.length-1){
        result += list[i].name + ", " + list[i].probability + "&";
      }
      else{
        result += list[i].name + ", " + list[i].probability;
      }
    }
    return result;
  }
  
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}

}
