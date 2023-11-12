import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { UserRoles } from 'src/app/common/enums/user-roles.enum';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  activeUser: any;
  isVisible: boolean = false;

  constructor(
    private readonly pageRouter: PageRouterService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.user.activeUser)
      .subscribe((user) => {
        this.activeUser = user;
      });
  
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
     return  this.activeUser.role === UserRoles.ADMIN ? true : false; 
  }
  
}
