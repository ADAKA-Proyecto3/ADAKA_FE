import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPages } from './common/enums/url-pages.enum';

const routes: Routes = [
  {
    path:'',
    redirectTo: UrlPages.HOME,
    pathMatch: 'full'
  },
  {
    path: UrlPages.HOME,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: UrlPages.LANDING,
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
