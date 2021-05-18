import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { ForgetPage } from './forget/forget.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [LoginPage, SignupPage, ForgetPage],
    imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
