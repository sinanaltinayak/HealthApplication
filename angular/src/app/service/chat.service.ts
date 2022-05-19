import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private dbPath = '/chats';
  authState: any = null;
  uids: string[] = [];
  allUsers: User[]= [];
  chatRef: AngularFirestoreCollection<Chat>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private db: AngularFirestore
  ) {
    this.firebaseAuth.authState.subscribe( authState => {
    this.authState = authState;
    }); 
    this.chatRef = db.collection(this.dbPath);
  }



   getUserIds(){
    let uids: string[] = [];

    // Unique User IDs
    this.afs.collection('user_roles')
    .get()
    .subscribe((snapshot) =>{
      snapshot.forEach( async doc => {
        //console.log(doc.id, '=>', doc.data());
        uids.push(doc.id);
      });
    })
    this.uids = uids;
    console.log(uids);
    return uids;
  }

  getChat(chatId: any): AngularFirestoreDocument<Chat> {
    return this.afs
      .collection('chats')
      .doc(chatId);
  }

  getAllChats(){
    return this.chatRef;
  }

  getUserChats(id: string) {
        return this.afs
          .collection('chats', ref => ref.where('uid', '==', id))
          .snapshotChanges()
          .pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, data };
              });
            })
          );
  }

  async create() {
    const uid = this.authState.uid;

    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    const docRef = await this.afs.collection('chats').add(data);

    return this.router.navigate(['deneme/chats', docRef.id]);
  }

  async sendMessage(chatId: string, content: string) {
    const uid = this.authState.uid;

    const data = {
      uid,
      content,
      createdAt: Date.now()
    };

    if (uid) {
      const ref = this.afs.collection('chats').doc(chatId);
      return ref.update({
        messages: arrayUnion(data)
      });
    }
  }

  async deleteMessage(chatId: string, userId: string, msg: any) {
    const uid = localStorage.getItem("id");

    const ref = this.afs.collection('chats').doc(chatId);
    console.log(msg);
    if (userId === uid || msg.uid === uid) {
      // Allowed to delete
      delete msg.user;

    //   const chatnRef = doc(this.db, "chats", "messages");
    //   await updateDoc(chatnRef, {
    //     messages: arrayUnion("greater_virginia")
    // });

      return ref.update({
        messages: arrayRemove(msg)
      });

      
    }
  }

}
