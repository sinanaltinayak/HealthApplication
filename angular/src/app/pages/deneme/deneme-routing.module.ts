import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from 'src/app/layout/page-layout/page-layout.component';
import { AuthGuard } from 'src/app/service/auth.guard';
import { ChatComponent } from '../chat/chat.component';
import { DenemeComponent } from './deneme.component';

const routes: Routes = [
  {
    path: 'deneme',
    component: PageLayoutComponent,
    children: [
      { path: '', component: DenemeComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenemeRoutingModule { }
