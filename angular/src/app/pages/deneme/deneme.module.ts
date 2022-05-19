import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { DenemeRoutingModule } from './deneme-routing.module';
import { DenemeComponent } from './deneme.component';

// importing classes that is needed for history page

@NgModule({
  imports: [
    CommonModule,
    DenemeRoutingModule,
    FormsModule,

    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRippleModule,
    MatInputModule


  ],
  declarations: [DenemeComponent]
})
export class DenemeModule { }