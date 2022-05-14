import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private dbPath = '/doctors';

  patientsRef: AngularFirestoreCollection<Doctor>;

  constructor(private db: AngularFirestore) { 
    this.patientsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Doctor> {
    return this.patientsRef;
  }
  
  // finds the manager with the provided username and password
  loginDoctor(email: string, password: string): AngularFirestoreCollection<Doctor>{
    return this.db.collection("doctors", ref=>ref.where("email","==",email).where("password","==",password));
  }
}
