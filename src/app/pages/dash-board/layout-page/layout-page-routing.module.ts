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
        path: UrlPages.DEVICES,
        loadChildren: () =>
          import('../devices-page/devices-page.module').then(
            (m) => m.DevicesPageModule
          ),
      },
      {
        path: UrlPages.USERS,
        loadChildren: () =>
          import('../users-page/users-page.module').then(
            (m) => m.UsersPageModule
          ),
      },
      {
        path: UrlPages.ROOMS,
        loadChildren: () =>
          import('../rooms-page/rooms-page.module').then(
            (m) => m.RoomsPageModule
          ),
      },
      {
        path: UrlPages.MAIN,
        loadChildren: () =>
          import('../main-page/main-page.module').then(
            (m) => m.MainPageModule
          ),
      },
      {
        path: '**',
        redirectTo: UrlPages.MAIN,
        pathMatch: 'full',
      },
    ],
  },
{
    path: '',
    redirectTo: UrlPages.MAIN,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
