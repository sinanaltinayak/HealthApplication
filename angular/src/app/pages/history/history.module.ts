import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
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
import { ChatComponent } from './chat/chat.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { RateComponent } from './rate/rate.component';
import { RemoveComponent } from './remove/remove.component';

// importing classes that is needed for history page

@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule,
    NgxMaterialRatingModule,
    FormsModule,
    MatChipsModule,
    MatBadgeModule,
    MatTabsModule,
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
  declarations: [HistoryComponent, ChatComponent, RateComponent, RemoveComponent]
})
export class HistoryModule { }