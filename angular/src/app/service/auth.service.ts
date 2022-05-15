import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom, map, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: string = "";
  name: string = "";  

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {}

    async login(email: string, password: string) {

      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(async value => {
        localStorage.setItem('id',value.user!.uid);
        const user$ =  this.db.collection('/user_roles').doc(value.user!.uid).snapshotChanges().pipe(take(1));
        this.role = (await firstValueFrom(user$)).payload.get("role");
        this.name = (await firstValueFrom(user$)).payload.get("fullname");
        localStorage.setItem('role', this.role);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('name', this.name);
        console.log('Nice, it worked!');       
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
      });
    }

    register(email: string, password: string, name: string) {

      this.afAuth.createUserWithEmailAndPassword(email, password).then(value => {
        
        this.db.collection('user_roles').doc(value.user?.uid).set({
          email: email,
          fullname: name,
          password: password,
          role: 'patient'
        });
      }).catch(err => {
        console.log('Something went wrong: ',err.message)
      })
    }

    getUser(id: string): AngularFirestoreDocument<any>{
      
      return this.db.collection('/user_roles').doc(id);
    }

    logout() {
      localStorage.clear();
      this.afAuth.signOut().then(() => {
        console.log('Logged out');
      });
      localStorage.setItem('role', "default");
    }
    
}
