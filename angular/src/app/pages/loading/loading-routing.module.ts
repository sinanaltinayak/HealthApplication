import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from 'src/app/layout/page-layout/page-layout.component';
import { LoadingComponent } from './loading.component';

const routes: Routes = [
  {
    path: 'loading',
    component: PageLayoutComponent,
    children: [
      { path: '', component: LoadingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingRoutingModule { }