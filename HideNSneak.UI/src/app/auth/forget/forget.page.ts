import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-forget',
    templateUrl: './forget.page.html',
    styleUrls: ['./forget.page.scss'],
})
export class ForgetPage {
    constructor(public router: Router) {}

    back() {
        this.router.navigateByUrl('/login');
    }
}
