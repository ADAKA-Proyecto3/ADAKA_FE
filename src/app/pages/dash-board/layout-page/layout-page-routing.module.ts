import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout-page';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'devices',
        loadChildren: () =>
          import('../devices-page/devices-page.module').then(
            (m) => m.DevicesPageModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users-page/users-page.module').then(
            (m) => m.UsersPageModule
          ),
      },
      {
        path: 'medical_center',
        loadChildren: () =>
          import('../medical-center-page/medical-center-page.module').then(
            (m) => m.MedicalCenterPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'devices',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'devices',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
