import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from 'src/app/layout/page-layout/page-layout.component';
import { AuthGuard } from 'src/app/service/auth.guard';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: 'chat/:id',
    component: PageLayoutComponent,
    children: [
      { path: '', component: ChatComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
