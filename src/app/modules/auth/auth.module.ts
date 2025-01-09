import { NgModule } from '@angular/core';

import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthRoutingModule } from './auth-routing.module';
import {AuthService} from '@app/core/services/auth.service';

@NgModule({ imports: [AuthRoutingModule, AngularSvgIconModule.forRoot()], providers: [provideHttpClient(withInterceptorsFromDi()),

  ] })
export class AuthModule {}
