import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PageLayoutComponent } from "./page-layout/page-layout.component";
import { TopbarComponent } from "./topbar/topbar.component";
import {MatBadgeModule} from '@angular/material/badge';
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatButtonModule,
        MatSnackBarModule,
        MatListModule,
        MatFormFieldModule,
        MatMenuModule,
        MatInputModule,
        FormsModule
    ],
    exports: [
        PageLayoutComponent,
    ],
    declarations: [
        PageLayoutComponent,
        TopbarComponent,
    ]
})
export class LayoutModule {}