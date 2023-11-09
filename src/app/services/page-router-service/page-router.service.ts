import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../loading-service/loading.service';

@Injectable({
  providedIn: 'root',
})
export class PageRouterService {
  constructor(private router: Router, private loader: LoadingService) {}

  async route(url: string) {
    this.loader.showLoadingModal();
    this.router.navigate([url]).then(() => {
      this.loader.dismiss();
    });
  }
}
