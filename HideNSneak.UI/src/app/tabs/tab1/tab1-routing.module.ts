import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
    {
        path: '',
        component: Tab1Page,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
