import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecommendationRoutingModule } from './recommendation-routing.module';
import { RecommendationComponent } from './recommendation.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

// importing classes that is needed for home page

@NgModule({
  imports: [
    CommonModule,
    RecommendationRoutingModule,
    FormsModule,

    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule
    

  ],
  declarations: [RecommendationComponent]
})
export class RecommendationModule { }