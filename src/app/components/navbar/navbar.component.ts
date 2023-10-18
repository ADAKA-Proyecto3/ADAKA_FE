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
  
  // public sideBarItems=[
  //   {label:'Listado', icon:'label', url:'./list'},
  //   {label:'Añadir', icon:'add', url:'./new-hero'},
  //   {label:'Buscar', icon:'search', url:'./search'},
  // ]

  constructor(
    private readonly router: Router,
   // private readonly loadingService: LoadingService
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
}
