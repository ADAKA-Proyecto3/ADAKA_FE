import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  //standalone: true
})
export class NavbarComponent {

  windowWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = (event.target as Window).innerWidth;
  }
  
  constructor(
    private readonly router: Router,
  ) {}
  
  goToHome(): void {
    this.router.navigate([UrlPages.HOME]);
  }

  goToLogin(): void {
    this.router.navigate([UrlPages.AUTH]);
  }

  goToRegister(): void {
    this.router.navigate([`${UrlPages.AUTH}/${UrlPages.REGISTER}`]);
  }

  goToDashBoard(): void {
    this.router.navigate([UrlPages.DASHBOARD]);
  }

  goToPlans(): void {
    this.router.navigate([UrlPages.PLANS]);
  }

  goToLiveMap(): void {
    this.router.navigate([UrlPages.MAP]);
  }
}
