import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from 'src/app/layout/page-layout/page-layout.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: PageLayoutComponent,
    children: [
      { path: '', component: AdminComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
