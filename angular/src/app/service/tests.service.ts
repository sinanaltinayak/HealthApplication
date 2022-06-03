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
  getPendingTestsForDoctors(dep: string): AngularFirestoreCollection<Test> {
    return this.db.collection('tests', ref => ref.where('doctorID', '==', '').where('department', '==', dep));
  }
  getInProgressTestsByDoctorId(id: string): AngularFirestoreCollection<Test> {
    return this.db.collection('tests', ref => ref.where('doctorID', '==', id).where('finalDiagnosis', '==' , ''));
  }
  getFinalizedTestsByDoctorId(id: string): AngularFirestoreCollection<Test> {
    return this.db.collection('tests', ref => ref.where('doctorID', '==', id).where('finalDiagnosis', '!=' , ''));
  }
  getTestsByPatientId(id: string) : AngularFirestoreCollection<Test>{
    return this.db.collection('tests', ref => ref.where('patientID', '==', id));
  }
  getPendingTestsByPatientId(id: string): AngularFirestoreCollection<Test> {
    return this.db.collection('tests', ref => ref.where('patientID', '==', id).where('doctorID', '==', ''));
  }
  getInProgressTestsByPatientId(id: string): AngularFirestoreCollection<Test> {
    return this.db.collection('tests', ref => ref.where('patientID', '==', id).where('doctorID', '!=', '').where('finalDiagnosis', '==', ''));
  }
  getFinalizedTestsByPatientId(id: string): AngularFirestoreCollection<Test> {
    return this.db.collection('tests', ref => ref.where('patientID', '==', id).where('finalDiagnosis', '!=', ''));
  }

  create(test: Test): any {
    return this.testsRef.add({ ...test });
  }

  update(id: string, _doctorId: string){
    return this.testsRef.doc(id).update({doctorID: _doctorId});
  }

  updateFinalDiagnosis(id: string, _finalDiagnosis: string){
    return this.testsRef.doc(id).update({finalDiagnosis: _finalDiagnosis});
  }
  
  
}
