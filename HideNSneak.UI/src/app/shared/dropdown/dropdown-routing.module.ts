import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DropdownPage } from './dropdown/dropdown.page';

const routes: Routes = [
    {
        path: 'dropdown',
        component: DropdownPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DropdownPageRoutingModule {}
