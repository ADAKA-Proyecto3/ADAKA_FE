import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout-page';

const routes: Routes = [
  {
    path: 'layout',
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
