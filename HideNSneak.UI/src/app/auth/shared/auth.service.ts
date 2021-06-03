import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
    catchError,
    distinctUntilChanged,
    map,
    switchMap,
    take,
} from 'rxjs/operators';
import { ApiService } from '../../core/api/api.service';
import { JwtService } from '../../core/jwt/jwt.service';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject
        .asObservable()
        .pipe(distinctUntilChanged());

    public isAuthenticatedSubject = new BehaviorSubject<boolean>(
        !!this.jwtService.getToken()
    );

    constructor(
        private router: Router,
        private apiService: ApiService,
        private jwtService: JwtService
    ) {}

    public populate(): void {
        const getToken = this.jwtService.getToken();

        if (getToken) {
            const userid = this.jwtService.getDecodedTokenUserId(getToken);
            this.apiService
                .get(`/api/v1/users/${userid}`)
                .pipe(take(1))
                .subscribe(
                    (data) => {
                        this.setAuth(data);
                    },
                    (err) => this.purgeAuth()
                );
        } else {
            this.purgeAuth();
        }
    }

    public getUserId(): string {
        const getToken = this.jwtService.getToken();
        if (getToken) {
            return this.jwtService.getDecodedTokenUserId(getToken);
        } else {
            this.purgeAuth();
        }
        return null;
    }

    public setAuth(user: User): void {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    public purgeAuth(): void {
        this.jwtService.destroyToken();
        this.currentUserSubject.next({} as User);
        this.isAuthenticatedSubject.next(false);
    }

    public attemptAuth(type, credentials): Observable<string> {
        const route = type === 'login' ? '/login' : '/register';
        return this.apiService
            .post('/api/v1/auth' + route, { ...credentials })
            .pipe(
                take(1),
                map((data) => {
                    if (type === 'register') {
                        this.jwtService.saveToken(data.token);
                    } else {
                        this.jwtService.saveToken(data);
                    }
                    this.isAuthenticatedSubject.next(true);
                    this.populate();
                    return this.getUserId();
                })
            );
    }

    public IsValid(): Observable<boolean> {
        const token = this.jwtService.getToken();
        if (!!token) {
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(token);
            if (isExpired) {
                return of(false);
            }

            const userId = this.jwtService.getDecodedTokenUserId(token);
            if (!!!userId) {
                return of(false);
            }
        } else {
            return of(false);
        }
        return this.isAuthenticatedSubject.asObservable().pipe(
            take(1),
            switchMap((isAuth) => {
                if (isAuth) {
                    return of(true);
                } else {
                    this.goToLogin();
                    return of(false);
                }
            }),
            catchError((err) => {
                this.goToLogin();
                return of(false);
            })
        );
    }

    private goToLogin() {
        this.router.navigateByUrl('/login', { replaceUrl: true });
    }
}
