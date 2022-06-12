import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  constructor(public _authService: AuthService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {doctorID: string, name: string}
    ) { }

  ngOnInit(): void {
  }

  delete(doctorID: string){
/*     this._authService.getUser(doctorID).update({role: 'disabled'}).then(x => {
      this._snackBar.open("The account is disabled.", "Continue", {
        horizontalPosition: "right",
        verticalPosition: "bottom",
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
    });
    }); */
  }
}
