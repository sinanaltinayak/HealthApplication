import { Injectable } from '@angular/core';
import departments from './_files/distodep.json';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  public departmentList:{disease:string, department:string}[] = departments;

  constructor() { }

  getDepartment(disease: string){
    
    return this.departmentList.filter(x => x.disease == disease)[0].department;
  }
}
