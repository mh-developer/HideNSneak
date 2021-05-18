import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-forget',
    templateUrl: './forget.page.html',
    styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {}

    back() {
        this.router.navigateByUrl('');
    }
}
