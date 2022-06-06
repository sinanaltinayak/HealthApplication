import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestsService } from 'src/app/service/tests.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  constructor(public _testsService: TestsService,
    @Inject(MAT_DIALOG_DATA) public data: {testID: string, rate: string, drname: string}
    ) { }

  ngOnInit(): void {
  }

  rate(testID: string, rate: string){
    this._testsService.getTestByID(testID).update({rate : rate.toString()});
  }
}
