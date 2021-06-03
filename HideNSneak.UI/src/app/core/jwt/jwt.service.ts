import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class JwtService {
    public getToken(): string {
        return localStorage['access_token'];
    }

    public saveToken(token: { access_token: string, refresh_token: string, schema: string }): void {
        const { access_token, refresh_token, schema } = token;
        localStorage['access_token'] = access_token;
        localStorage['refresh_token'] = refresh_token;
        localStorage['schema'] = schema;
    }

    public destroyToken(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('schema');
        localStorage.clear();
    }

    public getDecodedTokenUserId(token: string): string {
        const jwtHelper = new JwtHelperService();
        const decoded = jwtHelper.decodeToken(token);
        return decoded ? decoded['user']['id'] : null;
    }

    public hasClaim(claimType: string) {
        const jwtHelper = new JwtHelperService();
        const token = this.getToken();
        const decoded = jwtHelper.decodeToken(token);
        return decoded ? decoded[claimType] : null;
    }
}
