import { Component } from '@angular/core';
import { PlanPricing } from 'src/app/common/enums/plan-pricing.enum';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage {
  isChecked = true;
  basicPlan = PlanPricing.BASIC_PLAN;
  proPlan = PlanPricing.PRO_PLAN;
  enterpricePlan = PlanPricing.ENTERPRISE_PLAN;
  months= PlanPricing.MONTHS;

}
