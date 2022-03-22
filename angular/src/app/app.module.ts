import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './pages/home/home.module';
import { RecommendationModule } from './pages/recommendation/recommendation.module';
import { MonitoringModule } from './pages/monitoring/monitoring.module';
import { LayoutModule } from './layout/layout.module';

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
    RecommendationModule,
    MonitoringModule,
    LayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
