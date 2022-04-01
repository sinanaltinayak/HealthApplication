import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Diagnosis } from '../models/diagnosis';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {


  API_URL = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }


  // get version
  // getResult() {
  //   return this.http.get(this.API_URL+'/api/getResult');
  // }

  getResult(symptoms: any){
    
    var test = {
      "test": 
      symptoms
    }
    
    return this.http.post(this.API_URL+'/api/getResult', test);
  }
}
