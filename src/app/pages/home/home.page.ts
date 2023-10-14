import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/interfaces/user.interface';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { loadUsers } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage implements OnInit {

  //!
// users: User[] = [];

  constructor(
    private readonly router: Router,
    private readonly loadingService: LoadingService,

    //!
    //private store: Store<AppState>
  ) {}

   ngOnInit(): void {
    //!
    // this.store.dispatch ( loadUsers() );
    // this.store.select('users').subscribe( ({users, status}) => {
    //   this.users = users;
    //   console.log("users", users);
    //   console.log("status", status);
    // });


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
