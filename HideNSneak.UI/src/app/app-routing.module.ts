import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: '',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('./profile/profile.module').then((m) => m.ProfilePageModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('./shared/dropdown/dropdown.module').then(
                (m) => m.DropdownPageModule
            ),
    },
    {
        path: '**',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
