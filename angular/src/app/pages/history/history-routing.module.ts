import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from 'src/app/layout/page-layout/page-layout.component';
import { HistoryComponent } from './history.component';

const routes: Routes = [
  {
    path: 'history',
    component: PageLayoutComponent,
    children: [
      { path: '', component: HistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
