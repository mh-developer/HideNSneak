import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./login/login.module').then((m) => m.LoginPageModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    },

    {
        path: 'signup',
        loadChildren: () =>
            import('./signup/signup.module').then((m) => m.SignupPageModule),
    },
    {
        path: 'forget',
        loadChildren: () =>
            import('./forget/forget.module').then((m) => m.ForgetPageModule),
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('./profile/profile.module').then((m) => m.ProfilePageModule),
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomePageModule),
    },
    {
        path: 'dropdown',
        loadChildren: () =>
            import('./dropdown/dropdown.module').then(
                (m) => m.DropdownPageModule
            ),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
