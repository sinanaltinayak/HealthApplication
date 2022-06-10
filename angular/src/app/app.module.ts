import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './pages/home/home.module';
import { MonitoringModule } from './pages/monitoring/monitoring.module';
import { LayoutModule } from './layout/layout.module';
import { TestsModule } from './pages/tests/tests.module';
import { HistoryModule } from './pages/history/history.module';
import { ProfileModule } from './pages/profile/profile.module';
import { MapModule } from './pages/map/map.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { AdminModule } from './pages/admin/admin.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

import { provideAnalytics,getAnalytics } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { Patient } from './models/patient';
import { Doctor } from './models/doctor';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HomeModule,
    MonitoringModule,
    LayoutModule,
    AdminModule,
    TestsModule,
    HistoryModule,
    ProfileModule,
    MapModule,
    DialogsModule,
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
   static userType: string = "default";

   static userPatient = new Map<string, Patient>();
   static userDoctor = new Map<string, Doctor>();
   static allPatients = new Map<string, Patient>();

   static testsInfoPending: any[] = [];
   static testsInfoHistory: any[] = [];
}
