import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsComponent } from './tests.component';

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
import {MatIconModule} from '@angular/material/icon';


import { ConfirmTestComponent } from './confirm-test/confirm-test.component';
import { FinalizeComponent } from './finalize/finalize.component';
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ChatComponent } from './chat/chat.component';
import { MatBadgeModule } from '@angular/material/badge';
import { DepartmentComponent } from './department/department.component';


// importing classes that is needed for home page

@NgModule({
  imports: [
    CommonModule,
    TestsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatTabsModule,
    MatBadgeModule,
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
    MatSelectModule,
    MatAutocompleteModule

  ],
  declarations: [TestsComponent, ConfirmTestComponent, ChatComponent, FinalizeComponent, DepartmentComponent]
})
export class TestsModule { }