import { Component } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage {
  isChecked = true;
  basicPlan = 500;
  proPlan = 1500;
  enterpricePlan = 4500;
  months= 12;

}
