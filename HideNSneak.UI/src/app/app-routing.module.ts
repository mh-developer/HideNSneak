import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
    },
    {
        path: '',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: () =>
            import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    },
    {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: () =>
            import('./profile/profile.module').then((m) => m.ProfilePageModule),
    },
    {
        path: '',
        canLoad: [AuthGuard],
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
