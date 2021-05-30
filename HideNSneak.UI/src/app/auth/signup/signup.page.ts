import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();

    public loading: boolean = false;
    public authForm: FormGroup;

    constructor(
        public router: Router,
        private authService: AuthService,
        private fb: FormBuilder,
        public toastController: ToastController
    ) {}

    ngOnInit() {
        this.authForm = this.fb.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public signup() {
        this.loading = true;
        const credentials = this.authForm.value;

        this.authService
            .attemptAuth('register', credentials)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (res) => {
                    this.router.navigateByUrl('/tabs/tab1', {
                        replaceUrl: true,
                    });
                },
                (err) => {
                    this.loading = false;
                    this.showError(err);
                },
                () => {
                    this.loading = false;
                }
            );
    }

    public goToLogin() {
        this.router.navigateByUrl('/login', { replaceUrl: true });
    }

    private async showError(err) {
        const toast = await this.toastController.create({
            message: 'Something went wrong. Please try again.',
            duration: 5000,
            color: 'danger',
        });
        toast.present();
    }
}
