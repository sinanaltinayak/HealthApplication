import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from 'src/app/layout/page-layout/page-layout.component';
import { MapComponent } from './map.component';

const routes: Routes = [
  {
    path: 'map',
    component: PageLayoutComponent,
    children: [
      { path: '', component: MapComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
