import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from 'src/app/layout/page-layout/page-layout.component';
import { RecommendationComponent } from './recommendation.component';

const routes: Routes = [
  {
    path: 'recommendation',
    component: PageLayoutComponent,
    children: [
      { path: '', component: RecommendationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationRoutingModule { }
