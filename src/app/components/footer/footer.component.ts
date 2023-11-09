import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
})
export class FooterComponent {

  constructor(
    private router:Router
  ) { }

  annoActual: number = new Date().getFullYear();

  goToLandingPage() {
    this.router.navigate([UrlPages.LANDING]);

  }
}
