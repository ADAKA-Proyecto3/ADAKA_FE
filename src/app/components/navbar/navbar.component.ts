import { Component, HostListener } from '@angular/core';

import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  windowWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = (event.target as Window).innerWidth;
  }

  constructor(private readonly pageRouter: PageRouterService) {}

  goToHome(): void {
    this.pageRouter.route(UrlPages.HOME);
  }

  goToLogin(): void {
    this.pageRouter.route(`${UrlPages.AUTH}`);
  }

  goToRegister(): void {
    this.pageRouter.route(`${UrlPages.AUTH}/${UrlPages.REGISTER}`);
  }

  goToDashBoard(): void {
    this.pageRouter.route(UrlPages.DASHBOARD);
  }

  goToPlans(): void {
    this.pageRouter.route(UrlPages.PLANS);
  }

  goToLiveMap(): void {
    this.pageRouter.route(UrlPages.MAP);
  }
}
