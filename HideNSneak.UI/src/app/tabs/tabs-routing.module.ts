import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'tab1',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import('./tab1/tab1.module').then((m) => m.Tab1PageModule),
            },
            {
                path: 'tab2',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import('./tab2/tab2.module').then((m) => m.Tab2PageModule),
            },
            {
                path: 'tab3',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import('./tab3/tab3.module').then((m) => m.Tab3PageModule),
            },
            {
                path: 'tab4',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import('../profile/profile.module').then(
                        (m) => m.ProfilePageModule
                    ),
            },
            {
                path: '',
                redirectTo: '/tabs/tab1',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}
