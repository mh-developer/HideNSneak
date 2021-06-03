import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiService } from '../../core/api/api.service';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private apiService: ApiService) {}

    public getAllUser(): Observable<User[]> {
        return this.apiService.get(`/api/v1/users`).pipe(
            take(1),
            map((data) => data)
        );
    }

    public getUser(userId: string): Observable<User> {
        return this.apiService.get(`/api/v1/users/${userId}`).pipe(
            take(1),
            map((data) => data)
        );
    }

    public updateUser(userId: string, user: User): Observable<User> {
        return this.apiService.put(`/api/v1/users/${userId}`, user).pipe(
            take(1),
            map((data) => data)
        );
    }

    public deleteUser(userId: string): Observable<User> {
        return this.apiService.delete(`/api/v1/users/${userId}`).pipe(
            take(1),
            map((data) => data)
        );
    }
}
