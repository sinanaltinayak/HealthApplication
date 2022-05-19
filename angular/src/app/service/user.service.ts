import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/user_roles';

  userRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection {
    return this.userRef;
  }
}
