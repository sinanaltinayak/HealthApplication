import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringComponent } from './monitoring.component';

import {MatTabsModule} from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms'; 
import {MatCheckboxModule} from '@angular/material/checkbox';

// importing classes that is needed for home page

@NgModule({
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    FormsModule,
    MatSortModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTabsModule,
    MatPaginatorModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  declarations: [MonitoringComponent]
})
export class MonitoringModule { }