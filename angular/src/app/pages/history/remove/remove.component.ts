import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestsService } from 'src/app/service/tests.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  constructor(public _testsService: TestsService,
    @Inject(MAT_DIALOG_DATA) public data: {testID: string}
    ) { }

  ngOnInit(): void {
  }

  delete(testID: string){
    this._testsService.getTestByID(testID).delete();
  }
}
