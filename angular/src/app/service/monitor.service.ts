import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Monitor } from 'src/app/models/monitor';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private dbPath = '/monitors';

  MonitorsRef;

  constructor(private db: AngularFirestore) { 
    this.MonitorsRef = db.collection(this.dbPath);
  }
  
  getAll() {
    return this.MonitorsRef;
  }

  getMonitorByID(id: string) {
    return this.MonitorsRef.doc(id);
  }

  getPatientMonitors(id: string): AngularFirestoreCollection<Monitor> {
    return this.db.collection(this.dbPath, ref => ref.where('patientID', '==', id));
  }

  setPatientMonitors(monitor: Monitor): any{
    
    return this.db.collection(this.dbPath).add({ ...monitor });
  }

  removePatientMonitors(id: string): any{
    
    return this.db.collection(this.dbPath).doc(id).delete();
  }

}
