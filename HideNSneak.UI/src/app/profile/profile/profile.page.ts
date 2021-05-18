import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    tab: string;
    tab2: string;
    tab3: string;
    constructor() {
        this.tab = 'create';
        this.tab2 = 'bank';
        this.tab3 = 'faq';
    }
    ngOnInit() {}

    somethingClicked: boolean = false;
    somethingClicked2: boolean = true;
    somethingClickedper: boolean = false;
    somethingClickedper2: boolean = true;
    clickfaq: boolean = false;
    pressfaq: boolean = true;
    hideOnSomethingClicked() {
        this.somethingClicked = !this.somethingClicked;
        this.somethingClicked2 = false;
    }
    hideOnSomethingClicked2() {
        this.somethingClickedper2 = !this.somethingClickedper2;
        this.somethingClickedper = false;
    }
    hideOnSomethingClickedper() {
        this.somethingClickedper = !this.somethingClickedper;
        this.somethingClickedper2 = false;
    }
    hideOnSomethingClickedper2() {
        this.somethingClickedper2 = !this.somethingClickedper2;
        this.somethingClickedper = false;
    }

    faq() {
        this.clickfaq = !this.clickfaq;
        this.pressfaq = false;
    }

    faq1() {
        console.log('clic');
        this.pressfaq = !this.pressfaq;
        this.clickfaq = false;
    }
}
