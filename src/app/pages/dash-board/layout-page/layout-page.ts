import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.html',
  styleUrls: ['./layout-page.scss']
})
export class LayoutPage {

  public sideBarItems = [
    {
      label: 'Usuarios',
      icon: 'people',
      url:`/${UrlPages.DASHBOARD}/${UrlPages.USERS}`
    },
    {
      label: 'Centros',
      icon: 'apartment',
      url:`/${UrlPages.DASHBOARD}/${UrlPages.MEDICAL_CENTERS}`
    },
    {
      label: 'Salas',
      icon: 'bedroom_child',
      url:`/${UrlPages.DASHBOARD}/${UrlPages.ROOMS}`
    },
    {
      label: 'Dispositivos',
      icon: 'devices',
      url:`/${UrlPages.DASHBOARD}/${UrlPages.DEVICES}`
    },
    
  ];

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  get currentUser(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate([`/${UrlPages.AUTH}/${UrlPages.LOGIN}`]);
  }
}
