import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from 'src/app/layout/page-layout/page-layout.component';
import { TestsComponent } from './tests.component';

const routes: Routes = [
  {
    path: 'tests',
    component: PageLayoutComponent,
    children: [
      { path: '', component: TestsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }
