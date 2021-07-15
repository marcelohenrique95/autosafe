import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPartnerOutsiteComponent } from './new-partner-outsite.component';

const routes: Routes = [
  {
    path: '',
    component: NewPartnerOutsiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPartnerOutsiteRoutingModule { }
