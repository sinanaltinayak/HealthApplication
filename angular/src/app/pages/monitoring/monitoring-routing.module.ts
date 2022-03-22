import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from 'src/app/layout/page-layout/page-layout.component';
import { MonitoringComponent } from './monitoring.component';

const routes: Routes = [
  {
    path: 'monitoring',
    component: PageLayoutComponent,
    children: [
      { path: '', component: MonitoringComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
