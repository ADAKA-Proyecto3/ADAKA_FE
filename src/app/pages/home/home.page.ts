import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { LoadingService } from 'src/app/services/loading-service/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly loadingService: LoadingService
  ) {}

   ngOnInit(): void {
    this.initializeProperties();
    //this.loadingService.showLoadingModal();
  }

  async initializeProperties() {
    this.loadingService.showLoadingModal();
    setTimeout(() => {
      this.loadingService.dismiss();
    }, 3000);
  }

  goToLanding(): void {
    this.router.navigate([UrlPages.LANDING]);
  }

  goToLogin(): void {
    this.router.navigate([UrlPages.AUTH]);
  }

  goToDashBoard(): void {
    this.router.navigate([UrlPages.DASHBOARD]);
  }
}
