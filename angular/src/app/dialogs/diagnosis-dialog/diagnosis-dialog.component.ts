import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiagnosisInformation } from 'src/app/models/diagnosisInformation';
import { DiagnosisService } from 'src/app/service/diagnosis.service';

@Component({
  selector: 'app-diagnosis-dialog',
  templateUrl: './diagnosis-dialog.component.html',
  styleUrls: ['./diagnosis-dialog.component.css']
})
export class DiagnosisDialogComponent implements OnInit {

  currentDiagnosisInformation!: DiagnosisInformation;

  showLoaderResult: boolean = false;
  
  constructor(
    public _diagnosisService: DiagnosisService,
    public dialog: MatDialogModule,
    @Inject(MAT_DIALOG_DATA) public data: {diagnosisName: string}
  ) { }

  ngOnInit(): void {
    this.currentDiagnosisInformation = this._diagnosisService.getDiagnosisInformation(this.data.diagnosisName);
  }

}
