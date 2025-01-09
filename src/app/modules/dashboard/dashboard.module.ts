import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from '@app/core/interceptor/auth.interceptor';
@NgModule({
  imports: [DashboardRoutingModule],

})
export class DashboardModule {}

