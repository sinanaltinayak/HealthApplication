import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FlaskService } from '../service/flask.service';


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
  options: string[] = ['Polyuria', 'Polydipsia', 'Sudden Weight Loss', 'Weakness', 'Polyphagia', "Genital Thrush", "Visual Blurring", "Itching", "Irritability", "Delayed Healing", "Partial Paresis", "Muscle Stiffness", "Alopecia", "Obesity"];
  filteredOptions!: Observable<string[]>;
  selectedSymptoms: string[] = [];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  displayedColumns: string[] = ['name'];
  dataSource = [
    {name: 'Diabetes'},
    {name: 'Coeliac Disease'},
    {name: 'Pancreatitis'},
    {name: 'Thyroid'},
    {name: 'Mastopathy'},
  ];;
  
  @ViewChild('symptomInput') symptomInput!: ElementRef<HTMLInputElement>;

  constructor(
    public _service: FlaskService, ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(null),
      map((symptom: string | null) => (symptom ? this._filter(symptom) : this.options.slice())),
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedSymptoms.push(event.option.viewValue);
    console.log(this.selectedSymptoms);
    this.symptomInput.nativeElement.value = '';
    this.myControl.setValue(null);
  }


  remove(fruit: string): void {
    const index = this.selectedSymptoms.indexOf(fruit);

    if (index >= 0) {
      this.selectedSymptoms.splice(index, 1);
    }
  }

  async getResult(){
    this._service.getResult().subscribe(data => {
      console.log(data);
    });
  }
}
