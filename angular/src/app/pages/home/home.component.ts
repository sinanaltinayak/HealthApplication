import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FlaskService } from '../../service/flask.service';


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
export class HomeComponent{

  myControl = new FormControl();
  options: string[] = ["Itching", "Skin Rash", "Nodal Skin Eruptions", "Continuous Sneezing", "Shivering", "Chills", "Joint Pain", "Stomach Pain", "Acidity", "Ulcers on Tongue", "Muscle Wasting", "Vomiting", "Burning Micturition", "Spotting Urination", "Fatigue", "Weight Gain", "Anxiety", "Cold Hands and Feets", "Mood Swings", "Weight Loss", "Restlessness", "Lethargy", "Patches in Throat", "Irregular Sugar Level", "Cough", "High Fever", "Sunken Eyes", "Breathlessness", "Sweating", "Dehydration", "Indigestion", "Headache", "Yellowish Skin", "Dark Urine", "Nausea", "Loss Of Appetite", "Pain Behind The Eyes", "Back Pain", "Constipation", "Abdominal Pain", "Diarrhoea", "Mild Fever", "Yellow Urine", "Yellowing of Eyes", "Acute Liver Failure", "Fluid Overload", "Swelling Of Stomach", "Swelled Lymph Nodes", "Malaise", "Blurred and Distorted Vision", "Phlegm", "Throat Irritation", "Redness Of Eyes", "Sinus Pressure", "Runny Nose", "Congestion", "Chest Pain", "Weakness in Limbs", "Fast Heart Rate", "Pain During Bowel Movements", "Pain in Anal Region", "Bloody Stool", "Irritation in Anus", "Neck Pain", "Dizziness", "Cramps", "Bruising", "Obesity", "Swollen Legs", "Swollen Blood Vessels", "Puffy Face and Eyes", "Enlarged Thyroid", "Brittle Nails", "Swollen Extremeties", "Excessive Hunger", "Extra Marital Contacts", "Drying and Tingling Lips", "Slurred Speech", "Knee Pain", "Hip Joint Pain", "Muscle Weakness", "Stiff Neck", "Swelling Joints", "Movement Stiffness", "Spinning Movements", "Loss Of Balance", "Unsteadiness", "Weakness Of One Body Side", "Loss Of Smell", "Bladder Discomfort", "Foul Smell Ofurine", "Continuous Feel Of Urine", "Passage Of Gases", "Internal Itching", "Toxic Look (Typhos)", "Depression", "Irritability", "Muscle Pain", "Altered Sensorium", "Red Spots Over Body", "Belly Pain", "Abnormal Menstruation", "Dischromic Patches", "Watering From Eyes", "Increased Appetite", "Polyuria", "Family History", "Mucoid Sputum", "Rusty Sputum", "Lack Of Concentration", "Visual Disturbances", "Receiving Blood Transfusion", "Receiving Unsterile Injections", "Coma", "Stomach Bleeding", "Distention Of Abdomen", "History Of Alcohol Consumption", "Fluid Overload", "Blood in Sputum", "Prominent Veins On Calf", "Palpitations", "Painful Walking", "Pus Filled Pimples", "Blackheads", "Scurring", "Skin Peeling", "Silver Like Dusting", "Small Dents in Nails", "Inflammatory Nails", "Blister", "Red Sore Around Nose", "Yellow Crust Ooze", "Prognosis"];
  filteredOptions!: Observable<string[]>;
  selectedSymptoms: string[] = [];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  selectedSymptomsIndex: Array<number> = new Array<number>(132).fill(0);

  displayedColumns: string[] = ['name'];
  possibleDiagnosis = [
    {name: 'Diabetes'},
    {name: 'Coeliac Disease'},
    {name: 'Pancreatitis'},
    {name: 'Thyroid'},
    {name: 'Mastopathy'},
  ];;
  
  @ViewChild('symptomInput') symptomInput!: ElementRef<HTMLInputElement>;

  constructor( public _service: FlaskService ) 
  {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(null),
      map((symptom: string | null) => (symptom ? this._filter(symptom) : this.options.slice())),
    );

    console.log(this.selectedSymptomsIndex);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedSymptoms.push(event.option.viewValue);
    
    this.selectedSymptomsIndex[Number(event.option.id.slice(11))-2] = 1;
    
    console.log(this.selectedSymptomsIndex);
    this.symptomInput.nativeElement.value = '';
    this.myControl.setValue(null);
  }

  remove(symptom: string): void {
    console.log(symptom);
    const index = this.selectedSymptoms.indexOf(symptom);
    
    const finder = (element: any) => element == symptom;

    var result = this.options.findIndex(finder);

    this.selectedSymptomsIndex[result] = 0;

    if (index >= 0) {
      this.selectedSymptoms.splice(index, 1);
    }
  }

  getResult(){

    let xd = this._service.getResult(this.selectedSymptomsIndex);
    console.log(xd);
    
  }
}
