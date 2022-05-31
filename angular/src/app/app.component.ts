import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppModule } from './app.module';
import { Diagnosis } from './models/diagnosis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  NotifCount: number = 0;
  constructor (private _snackBar: MatSnackBar, private myRoute: Router) { }

    // function for displaying a message
  openSnackBar(title: string, action: string) {
    this._snackBar.open(title, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  // this is a function for making the user wait for some subscriptions to end
  reload(location: string, time: number){
    setTimeout(() => {
      this.myRoute.navigateByUrl("/"+location);
      console.log(AppModule.userType);
    },
    time);
    /* this.myRoute.navigateByUrl("/loading"); */
  }

  parseDiagnosis(txt: string){
    let diagnosisList: Diagnosis[] = [];

    let textSplitted = txt.split("&");

    for(let i = 0; i< textSplitted.length; i++){
      let textSplittedSplitted = textSplitted[i].split(",");
      diagnosisList.push(new Diagnosis(textSplittedSplitted[0], parseFloat(textSplittedSplitted[1])));
    }
    
    return diagnosisList;
  }
}
