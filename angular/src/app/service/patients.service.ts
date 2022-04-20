import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private dbPath = '/patients';

  patientsRef: AngularFirestoreCollection<Patient>;

  constructor(private db: AngularFirestore) { 
    this.patientsRef = db.collection(this.dbPath);
  }
  // finds the student with the provided username and password
  loginPatient(email: string, password: string): AngularFirestoreCollection<Patient>{
    return this.db.collection("patients", ref=>ref.where("email","==",email).where("password","==",password));
  }  
  

  getAll(): AngularFirestoreCollection<Patient> {
    return this.patientsRef;
  }

  getPatient(patientId: string): AngularFirestoreDocument<Patient> {
    return this.patientsRef.doc(patientId);
  }

  create(patient: Patient): any {
    return this.patientsRef.add({ ...patient });
  }

  update(id: string, data: any): Promise<void> {
    return this.patientsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.patientsRef.doc(id).delete();
  }
}
