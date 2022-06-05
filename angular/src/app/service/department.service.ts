import { Injectable } from '@angular/core';
import departments from './_files/distodep.json';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  public departmentList:{disease:string, department:string}[] = departments;

  constructor() { }

  getDepartment(disease: string){
    console.log(this.departmentList.find(x => x.disease == disease));

    var diagnosis = this.departmentList.find(x => x.disease == disease)
    if (diagnosis != null)
      return diagnosis.department;
    else
      return ""
  }
}
