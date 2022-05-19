import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, map, Observable } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Chat, Message } from 'src/app/models/chat';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';
import { DenemeComponent } from '../deneme/deneme.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat$!: any;
  newMsg!: string;
  chatId!: string;

  userId = localStorage.getItem("id") as string;

  currentChat!: any;
  currentMessages!: any;

  constructor(
    public chatService: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getChat();
  }

  async getChat(){
    this.chatId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.chatId);

    this.currentChat = (await lastValueFrom(this.chatService.getChat(this.chatId).get())).data(); 

    console.log(this.currentChat);
    this.currentMessages = this.currentChat.messages;
    // this.chat$ = this.cs.joinUsers(source); // .pipe(tap(v => this.scrollBottom(v)));
    
  }
  submit(chatId: string) {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.chatService.sendMessage(chatId, this.newMsg);
    this.newMsg = '';
    this.scrollBottom();
    this.getChat();
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

  deneme(){
    console.log(this.chat$);
  }


  
}
