import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPages } from './common/enums/url-pages.enum';
import { authGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo: UrlPages.HOME,
    pathMatch: 'full'
  },
  {
    path: UrlPages.AUTH,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

  },
  {
    path: UrlPages.HOME,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: UrlPages.LANDING,
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: UrlPages.PLANS,
    loadChildren: () => import('./pages/plans/plans.module').then(m => m.PlansModule)
  },
  {
    path: UrlPages.DASHBOARD,
    canActivate: [authGuard],
    loadChildren: () => import('./pages/dash-board/layout-page/layout-page.module').then(m => m.LayoutPageModule)
  },
  {
    path: UrlPages.MEDICAL_CENTERS,
    canActivate: [authGuard],
    loadChildren: () => import('./pages/dash-board/medicalCenters-page/medicalCenter-page.module').then(m => m.MedicalCenterModule)
  },
  {
    path: '**',
    redirectTo: UrlPages.HOME,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
