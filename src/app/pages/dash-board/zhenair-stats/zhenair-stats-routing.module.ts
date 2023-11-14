import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZhenairStatsPage } from './zhenair-stats.page';



const routes: Routes = [
  {
    path: '',
    component: ZhenairStatsPage
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZhenAirStatsRoutingModule { }
