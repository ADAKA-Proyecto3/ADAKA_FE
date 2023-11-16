import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { UserRoles } from 'src/app/common/enums/user-roles.enum';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {
  activeUser: any;
  isVisible: boolean = false;
  private activeUserSuscription: Subscription = new Subscription();

  constructor(
    private readonly pageRouter: PageRouterService,
    private readonly store: Store<AppState>,
    private readonly authService: AuthService
  ) {}


  ngOnInit(): void {
    this.activeUserSuscription = this.store
      .select((state) => state.user.activeUser)
      .subscribe((user) => {
        this.activeUser = user;
      });
  
  }

  ngOnDestroy(): void {
    this.activeUserSuscription.unsubscribe();
  }

  goToUsers(): void {
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.USERS}`);
  }

  goToMedicalCenters(): void {
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.MEDICAL_CENTERS}`);
  }

  goToRooms(): void {
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.ROOMS}`);
  }

  goToDevices(): void {
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.DEVICES}`);
  }

  goToHistorical(): void {
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.ZHENAIR_STATS}`);
  }

  goToMain() {
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.MAIN}`);
  }

  showDiv():boolean {
    return this.authService.isAdmin(); 
  }
  
}
