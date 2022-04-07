import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoadingRoutingModule } from './loading-routing.module';
import { LoadingComponent } from './loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


// importing classes that is needed for loading page

@NgModule({
  imports: [
    CommonModule,
    LoadingRoutingModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  declarations: [LoadingComponent]
})
export class LoadingModule { }
