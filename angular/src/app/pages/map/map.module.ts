import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';

// importing classes that is needed for map page

@NgModule({
  imports: [
    CommonModule,
    MapRoutingModule,
    FormsModule,
  ],
  declarations: [MapComponent]
})
export class MapModule { }