import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

import { ProfilePage } from './profile/profile.page';

const routes: Routes = [
    {
        path: 'profile',
        component: ProfilePage,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
