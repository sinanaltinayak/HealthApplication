import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatChipsModule} from '@angular/material/chips';

import { MatBadgeModule } from '@angular/material/badge';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RemoveComponent } from './remove/remove.component';

// importing classes that is needed for admin page

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxMaterialRatingModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatBadgeModule,
    MatTabsModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRippleModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,

  ],
  declarations: [AdminComponent, RemoveComponent]
})
export class AdminModule { }