import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DropdownPage } from '../../shared/dropdown/dropdown/dropdown.page';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    tab: string;
    tab2: string;
    title: string = 'HideNSeek project';
    latitude: number = 46.55465;
    longitude: number = 15.645881;
    zoom: number = 6;
    styles: any;

    constructor(
        public router: Router,
        public popoverController: PopoverController,
        private authService: AuthService
    ) {
        this.tab = 'create';
        this.tab2 = 'all';
    }

    async dropdown(event) {
        const popover = await this.popoverController.create({
            component: DropdownPage,
            cssClass: 'dropdown',
            event: event,
            translucent: true,
        });
        await popover.present();

        const { role } = await popover.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
    }

    logout() {
        this.router.navigateByUrl('/login', { replaceUrl: true });
        this.authService.purgeAuth();
    }
}
