import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private readonly pageRouter: PageRouterService) {}

  goToRegister(): void {
    this.pageRouter.route(`${UrlPages.AUTH}/${UrlPages.REGISTER}`);
  }

  
}
