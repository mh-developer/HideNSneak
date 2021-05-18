import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    pepperoni: any;

    constructor(public router: Router) {}

    ngOnInit() {}
    login() {
        this.router.navigateByUrl('');
    }
}
