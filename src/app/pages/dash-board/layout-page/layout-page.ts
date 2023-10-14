import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.html',
  styleUrls: ['./layout-page.scss']
})
export class LayoutPage {

  public sideBarItems = [
    {
      label: 'Users',
      icon: 'people',
      url:'/dashboard/users'
    },
    {
      label: 'Devices',
      icon: 'devices',
      url:'/dashboard/devices'
    },
    
  ];

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  get currentUser(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
