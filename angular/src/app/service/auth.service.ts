import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { firstValueFrom, map, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: string = "";
  name: string = "";  
  isAuth: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {}

    login(email: string, password: string) {

      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        localStorage.setItem('id',value.user!.uid);
/*         this.isAuth = true; */
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
    async getRole(email: string){

      const source$ = this.db.collection("user_roles", ref=>ref.where("email","==",email)).snapshotChanges().pipe(take(1));
      (await firstValueFrom(source$)).map(d => {
        this.role = d.payload.doc.get("role");
        localStorage.setItem('role', this.role);
        localStorage.setItem('email', d.payload.doc.get("email"));
        localStorage.setItem('password', d.payload.doc.get("password"));
      });

      return this.role;
    }

/*     async getCurrentUser(){

      const auth = await this.afAuth.currentUser;
      if(auth?.uid != null) {
        this.isAuth = true;
      }
      
      return this.isAuth;
    } */

    getUser(id: string): AngularFirestoreDocument<any>{
      
      return this.db.collection('/user_roles').doc(id);
    }

    async getName(email: string) : Promise<string>{

      const source$ = this.db.collection("user_roles", ref=>ref.where("email","==",email)).snapshotChanges().pipe(take(1));
      (await firstValueFrom(source$)).map(d => {
        this.name = d.payload.doc.get("fullname");
        localStorage.setItem('name', this.name);
      });

      return this.name;
    }
    logout() {
      localStorage.clear();
      this.afAuth.signOut().then(() => {
        console.log('Logged out');
      });
    }
    
}
