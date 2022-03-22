import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringComponent } from './monitoring.component';

import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

// importing classes that is needed for home page

@NgModule({
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    FormsModule,

    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule
  ],
  declarations: [MonitoringComponent]
})
export class MonitoringModule { }