import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPage } from './forget/forget.page';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';

const routes: Routes = [
    {
        path: 'login',
        component: LoginPage,
    },
    {
        path: 'signup',
        component: SignupPage,
    },
    {
        path: 'forget',
        component: ForgetPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
