import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, of, switchMap, take } from 'rxjs';
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
    private router: Router,
    private firebaseAuth: AngularFireAuth,
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

  getTestChat(id: string) {
    return this.afs
      .collection('chats', ref=>ref.where('testID', '==', id))
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

  async create(patientID: string, testID: string, content: string) {
    const doctorID = this.authState.uid;
    const senderID = doctorID;

    const data = {
      doctorID,
      patientID,
      testID,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    const messageData = {
      senderID,
      content,
      createdAt: Date.now()
    };

    const chatDocRef = await this.afs.collection('chats').add(data).then(async docRef => {
        const ref = this.afs.collection('chats').doc(docRef.id);
        return [ ref.update({
          messages: arrayUnion(messageData)
        }),  await this.afs.collection('tests').doc(testID).update({chatID: docRef.id})]
  })
  .catch(error => console.error("Error adding document: ", error));

    //return this.router.navigate(['deneme/chats', docRef.id]);
  }

  async createDeneme() {
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
    const senderID = this.authState.uid;

    const data = {
      senderID,
      content,
      createdAt: Date.now()
    };

    if (senderID) {
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
