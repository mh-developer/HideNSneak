import { NavigationComponent } from './navigation/navigation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import('../game/game.module').then((m) => m.GameModule),
            },
            {
                path: '',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import('../rooms/rooms.module').then((m) => m.RoomsModule),
            },
            {
                path: '',
                canLoad: [AuthGuard],
                loadChildren: () =>
                    import('../profile/profile.module').then(
                        (m) => m.ProfilePageModule
                    ),
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NavigationRoutingModule {}
