import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlanPricing } from 'src/app/common/enums/plan-pricing.enum';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';

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
  months = PlanPricing.MONTHS;

  constructor(private readonly pageRouter: PageRouterService) {}

  goToRegister(): void {
    this.pageRouter.route(`${UrlPages.AUTH}/${UrlPages.REGISTER}`);
  }
}
