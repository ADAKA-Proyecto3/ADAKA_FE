import { Component } from '@angular/core';

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
      url:'/x/layout/users'
    },
    {
      label: 'Devices',
      icon: 'devices',
      url:'/x/layout/devices'
    },
    
  ];
}
