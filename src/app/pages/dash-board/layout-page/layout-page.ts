import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadActiveUser } from '../../../store/actions/activeUser.actions';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UserRoles } from 'src/app/common/enums/user-roles.enum';
import { DebugerService } from 'src/app/services/debug-service/debug.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.html',
  styleUrls: ['./layout-page.scss'],
})
export class LayoutPage implements OnInit {
  public adminSideBarItems = [
    {
      label: 'Usuarios',
      icon: 'people',
      url: `/${UrlPages.DASHBOARD}/${UrlPages.USERS}`,
    },
    {
      label: 'Centros',
      icon: 'home_health',
      url: `/${UrlPages.DASHBOARD}/${UrlPages.MEDICAL_CENTERS}`,
    },
    {
      label: 'Salas',
      icon: 'bed',
      url: `/${UrlPages.DASHBOARD}/${UrlPages.ROOMS}`,
    },
    {
      label: 'Dispositivos',
      icon: 'devices',
      url: `/${UrlPages.DASHBOARD}/${UrlPages.DEVICES}`,
    },
    {
      label: 'Lecturas',
      icon: 'bar_chart',
      url: `/${UrlPages.DASHBOARD}/${UrlPages.ZHENAIR_STATS}`,
    },
  ];

  public userSideBarItems = [
    {
      label: 'Salas',
      icon: 'bed',
      url: `/${UrlPages.DASHBOARD}/${UrlPages.ROOMS}`,
    },
    {
      label: 'Lecturas',
      icon: 'bar_chart',
      url: `/${UrlPages.DASHBOARD}/${UrlPages.ZHENAIR_STATS}`,
    },
  ];

  activeUser: any;
  expiredPassword:boolean = false;

  constructor(
    private readonly authService: AuthService,

    private readonly store: Store<AppState>,
    private readonly pageRouter: PageRouterService
  ) {}

  ngOnInit(): void {
    if (this.activeUser === '' || this.activeUser === undefined) {
      this.authService.checkSignedInUser();
    }
    this.loadActiveUser();

    this.store
      .select((state) => state.user.activeUser)
      .subscribe((user) => {
        this.activeUser = user;
        this.expiredPassword = user.status === 'FREEZE' ? true : false;
      });
  }

  manageProfile(): void {
    this.pageRouter.route(`/${UrlPages.DASHBOARD}/${UrlPages.PROFILE}`);
  }

  onLogout(): void {
    this.authService.logout();
    this.pageRouter.route(`/${UrlPages.AUTH}/${UrlPages.LOGIN}`);
  }

  private loadActiveUser() {
    this.store.select('user').subscribe((activeUser) => {
      this.activeUser = activeUser.activeUser?.name;
    });
  }

  goToMain() {
    if(this.expiredPassword) return;
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.MAIN}`);
  }

  checkAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
