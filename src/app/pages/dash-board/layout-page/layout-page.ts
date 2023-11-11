import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadActiveUser } from '../../../store/actions/activeUser.actions';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.html',
  styleUrls: ['./layout-page.scss'],
})
export class LayoutPage implements OnInit {
  public sideBarItems = [
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
      label: 'Estadísticas',
      icon: 'bar_chart',
      url: `/${UrlPages.DASHBOARD}/${UrlPages.ZHENAIR_STATS}`,
    },
  ];

  activeUser: String = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    if (this.activeUser === '' || this.activeUser === undefined) {
      this.authService.checkSignedInUser();
    }
    this.loadActiveUser();
  }

 
  manageProfile(): void {
    this.router.navigate([`/${UrlPages.DASHBOARD}/${UrlPages.PROFILE}`]);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate([`/${UrlPages.AUTH}/${UrlPages.LOGIN}`]);
  }

  private loadActiveUser() {
    this.store.select('user').subscribe((activeUser) => {
      this.activeUser = activeUser.activeUser?.name;
    });
  }
}
