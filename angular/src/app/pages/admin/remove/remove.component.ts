import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';
import { TestsService } from 'src/app/service/tests.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  constructor(public _authService: AuthService,
    private _snackBar: MatSnackBar,
    public _testsService: TestsService,
    public _chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: {doctorID: string, name: string}
    ) { }

  ngOnInit(): void {
  }

  delete(doctorID: string){
    this._authService.getUser(doctorID).update({role: 'disabled'}).then(x => {
      this._snackBar.open("The account is disabled.", "Continue", {
        horizontalPosition: "right",
        verticalPosition: "bottom",
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
    });
    });
    this._testsService.getInProgressTestsByDoctorId(doctorID).get().forEach(a => {
      a.docs.forEach(b => {
        b.ref.update({finalDiagnosis: "Canceled", unRead: true}); 
      })
    });
  }
}
