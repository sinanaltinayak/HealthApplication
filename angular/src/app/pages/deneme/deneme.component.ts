import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-deneme',
  templateUrl: './deneme.component.html',
  styleUrls: ['./deneme.component.css']
})
export class DenemeComponent implements OnInit {
  userChats$: any;
  allUsers: User[]=[];
  allChats: Chat[]=[];
  authState: any = null;
  constructor(public auth: AuthService, public chatService: ChatService, private firebaseAuth: AngularFireAuth, public userService: UserService) {
    this.firebaseAuth.authState.subscribe( authState => {
    this.authState = authState;
  });}

  ngOnInit() {
    this.userChats$ = this.chatService.getUserChats(localStorage.getItem("id")!);
    
    this.getAllChats();
    this.getAllUsers();
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
}

  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }

  get userData(): any {
    if ( ! this.isAuthenticated ) {
      return [];
    }
  
    return [
      {
        id: this.authState.uid,
        displayName: this.authState.displayName,
        email: this.authState.email,
        phoneNumber: this.authState.phoneNumber,
        photoURL: this.authState.photoURL,
      }
    ];
  }

  
  getAllUsers(){
    this.userService.getAll().snapshotChanges().pipe(
      
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          email: c.payload.doc.data()['email'],
          fullname: c.payload.doc.data()['fullname'], 
          password: c.payload.doc.data()['password'], 
          role: c.payload.doc.data()['role'], 
        })
        
        )
      )
    ).subscribe(data => { 

      console.log("deneme getallusers",data);

      for (let i = 0; i < data.length; i++) {
        
        this.allUsers.push(new User(data[i].id, data[i].email, data[i].fullname, data[i].password, data[i].role));
      }
    }); 
  }

  getAllChats(){
    this.chatService.getAllChats().snapshotChanges().pipe(
      
      map(changes=> changes.map(c=>
        ({id: c.payload.doc.id, 
          count: c.payload.doc.data()['count'],
          createdAt: c.payload.doc.data()['createdAt'], 
          uid: c.payload.doc.data()['uid'], 
          messages: c.payload.doc.data()['messages'], 
        })
        
        )
      )
    ).subscribe(data => { 


      for (let i = 0; i < data.length; i++) {
        
        if(data[i].uid  == localStorage.getItem("id")){
          this.allChats.push(new Chat(data[i].id, data[i].count, data[i].createdAt, data[i].messages, data[i].uid));
        }
      }
      console.log("deneme getallchats",this.allChats);
    }); 
  }
  // getAllChats(){
  //   this.chatService.getUserChats(localStorage.getItem("id")!).subscribe(i=>i.forEach(
  //      f => console.log(f)// this.allChats.push(new Chat(f.id, f.data.count, f.data.createdAt, f.data.messages, f.data.uid)))
  //   )); 
  // }
  getChatById(id: string){
    return this.allChats.find(f => f.id == id)
  }
}
