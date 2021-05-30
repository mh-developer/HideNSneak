import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, isEmpty, map } from 'rxjs/operators';
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

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject
        .asObservable()
        .pipe(isEmpty());

    constructor(
        private apiService: ApiService,
        private jwtService: JwtService
    ) {}

    public populate(): void {
        const getToken = this.jwtService.getToken();

        if (getToken) {
            const userid = this.jwtService.getDecodedTokenUserId(getToken);
            this.apiService.get(`/api/v1/users/${userid}`).subscribe(
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
                map((data) => {
                    this.jwtService.saveToken(data);
                    this.populate();
                    return this.getUserId();
                })
            );
    }
}
