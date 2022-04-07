import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Test } from '../models/test';


@Injectable({
  providedIn: 'root'
})
export class TestsService {
  

  private dbPath = '/tests';

  testsRef: AngularFirestoreCollection<Test>;

  constructor(private db: AngularFirestore) { 
    this.testsRef = db.collection(this.dbPath);
  }
  
  getAll(): AngularFirestoreCollection<Test> {
    return this.testsRef;
  }

  create(test: Test): any {
    return this.testsRef.add({ ...test });
  }
}
