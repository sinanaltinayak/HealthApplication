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

  getTestByID(id: string): AngularFirestoreDocument<Test> {
    return this.testsRef.doc(id);
  }

  getPendingTests(): AngularFirestoreCollection<Test> {
    return this.db.collection('tests', ref => ref.where('doctorID', '==', ''));
  }

  getTestsByDoctorId(id: string): AngularFirestoreCollection<Test> {
    return this.db.collection('tests', ref => ref.where('doctorID', '==', id));
  }

  getTestsByPatientId(id: string): AngularFirestoreCollection<Test> {
    return this.db.collection('tests', ref => ref.where('patientID', '==', id));
  }

  create(test: Test): any {
    return this.testsRef.add({ ...test });
  }

  update(id: string, _doctorId: string, _note: string){
    return this.testsRef.doc(id).update({doctorID: _doctorId, note: _note });
  }
  
}
