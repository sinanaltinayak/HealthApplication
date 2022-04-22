import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { DiagnosisService } from 'src/app/service/diagnosis.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  title!: string;
  description!: string;
  precautions: string[] = [];

  isDisabled = true;

  constructor(private route : ActivatedRoute, private _service: DiagnosisService) { }

  ngOnInit() {
    let title = this.route.snapshot.paramMap.get('diagnosis');
    this.title = title!;

    if(AppModule.userType == "patient"){
      this.isDisabled = false;
    }

    console.log(this.isDisabled);
    this.getDescription();
    this.getPrecautions();
  }

  getDescription(){
    this.description = this._service.diagnosisList.find(el => el.name == this.title)!.description;
  }

  getPrecautions(){
    this.precautions = this._service.diagnosisPrecautionList.find(el => el.name == this.title)!.precautions;
  }
}
