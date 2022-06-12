import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map} from 'rxjs';
import { Chat } from 'src/app/models/chat';
import { Test } from 'src/app/models/test';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';
import { TestsService } from 'src/app/service/tests.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  allUsers: User[]=[];

  newMsg!: string;

  userId = localStorage.getItem("id") as string;

  currentChat = new Map<string, Chat>();
  currentTest = new Map<string, Test>();

  testDate!: number;

  finalDiagnosis!: any;

  patientName!: string;
  patientID!: string;

  currentMessages!: any;

  constructor(
    public chatService: ChatService,
    public testService: TestsService,
    public authService: AuthService,
    public auth: AuthService,
    public userService: UserService,
    public dialog: MatDialogModule,
    @Inject(MAT_DIALOG_DATA) public data: {chatID: string, testID: string}
  ) {
    this.getAllUsers();
  }

  ngOnInit() {
    this.getChat();

    this.testService.getTestByID(this.data.testID).valueChanges().subscribe(xd => {
      
      this.currentTest.set(this.data.testID, xd!);
      this.getPatient()
      this.testDate = Array.from(this.currentTest.values())[0].createdAt;
      this.finalDiagnosis = Array.from(this.currentTest.values())[0].finalDiagnosis;
      this.patientID = Array.from(this.currentTest.values())[0].patientID;
    });
  }

  getChat(){
    this.chatService.getChat(this.data.chatID).valueChanges().subscribe(async xd => {
      this.currentChat.set(this.data.testID, xd!);
      this.currentMessages = xd?.messages;      
    });
  }

getPatient(){
  this.authService.getUser(Array.from(this.currentTest.values())[0].patientID).valueChanges().subscribe(data=> {
    this.patientName = data!.fullname;
  });
}

  getSender(id: string) {
    return this.allUsers.find(el => el.id == id)!.fullname;
  }

  submit(chatId: string) {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.chatService.sendMessage(chatId, this.newMsg);
    this.newMsg = '';
    this.scrollBottom();
    this.getChat();
    /* this.testService.getTestByID(this.data.testID).update({unRead : true}); */
    this.chatService.getChat(chatId).update({unRead : true});
  }

  delete(cid: string, uid: string, msg: string){
    this.chatService.deleteMessage(cid, uid, msg)
    this.getChat();
  }

  trackByCreated(i: any, msg: any) {
    return msg.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

  getAllUsers(){
    this.userService.getAll().snapshotChanges().pipe(
      
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          email: c.payload.doc.data()['email'],
          fullname: c.payload.doc.data()['fullname'], 
          password: c.payload.doc.data()['password'], 
          role: c.payload.doc.data()['role'], 
          gender: c.payload.doc.data()['gender'], 
          birthday: c.payload.doc.data()['birthday'], 
          phoneNumber: c.payload.doc.data()['phoneNumber'], 
          profilePicture: c.payload.doc.data()['profilePicture'], 
          height: c.payload.doc.data()['height'], 
          weight: c.payload.doc.data()['weight']
        })
        
        )
      )
    ).subscribe(data => { 

      for (let i = 0; i < data.length; i++) {
        
        this.allUsers.push(new User(data[i].id, data[i].fullname, data[i].email, data[i].password, data[i].role, data[i].gender, data[i].birthday, data[i].phoneNumber, data[i].profilePicture, data[i].height, data[i].weight));
      }
    }); 
  }
 
}
