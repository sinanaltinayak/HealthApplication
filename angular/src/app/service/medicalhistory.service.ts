import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MedicalHistory } from '../models/medicalHistory';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  private dbPath = '/medical_history';

  MedicalHistoryRef;

  constructor(private db: AngularFirestore) { 
    this.MedicalHistoryRef = db.collection(this.dbPath);
  }

  getMedicalHistory(id: string): AngularFirestoreDocument<MedicalHistory>{
      
    return this.db.collection('/medical_history').doc(id);
  }

  setMedicalHistory(medicalhistory: MedicalHistory, patientID: any): any{
    
    return this.db.collection(this.dbPath).doc(patientID).set({...medicalhistory})
    
  }


}

