import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PageLayoutComponent } from "./page-layout/page-layout.component";
import { TopbarComponent } from "./topbar/topbar.component";

import { RouterModule } from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
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