import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from '../../core/jwt/jwt.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private router: Router, private jwtService: JwtService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        const token = this.jwtService.getToken();

        if (token) {
            headersConfig[
                'Authorization'
            ] = `${localStorage['schema']} ${token}`;
        }

        const req = request.clone({ setHeaders: headersConfig });
        return next.handle(req).pipe(
            tap(
                (res) => res,
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 401) {
                            return;
                        }
                        this.router.navigateByUrl('/login', {
                            replaceUrl: true,
                        });
                    }
                }
            )
        );
    }
}
