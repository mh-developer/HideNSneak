import { AuthService } from 'src/app/auth/shared/auth.service';
import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.IsValid().pipe(
            switchMap((isAuthenticated) => {
                if (isAuthenticated) {
                    return of(true);
                } else {
                    this.router.navigateByUrl('/login', { replaceUrl: true });
                    return of(false);
                }
            })
        );
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.IsValid().pipe(
            switchMap((isAuthenticated) => {
                if (isAuthenticated) {
                    return of(true);
                } else {
                    this.router.navigateByUrl('/login', { replaceUrl: true });
                    return of(false);
                }
            })
        );
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.authService.IsValid().pipe(
            switchMap((isAuthenticated) => {
                if (isAuthenticated) {
                    return of(true);
                } else {
                    this.router.navigateByUrl('/login', { replaceUrl: true });
                    return of(false);
                }
            })
        );
    }
}
