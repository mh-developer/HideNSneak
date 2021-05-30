import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ApiService } from '../../core/api/api.service';
import { Room } from './models/rooms.model';

@Injectable({
    providedIn: 'root',
})
export class RoomsService {
    constructor(private apiService: ApiService) {}

    public getAllRooms(): Observable<Room[]> {
        return this.apiService.get(`/api/v1/rooms`).pipe(
            take(1),
            map((data) => data)
        );
    }

    public getRoom(roomId: string): Observable<Room> {
        return this.apiService.get(`/api/v1/rooms/${roomId}`).pipe(
            take(1),
            map((data) => data)
        );
    }

    public joinRoom(joinCode: string): Observable<Room> {
        return this.apiService.get(`/api/v1/rooms/join/${joinCode}`).pipe(
            take(1),
            map((data) => data)
        );
    }

    public quitRoom(joinCode: string): Observable<Room> {
        return this.apiService.get(`/api/v1/rooms/quit/${joinCode}`).pipe(
            take(1),
            map((data) => data)
        );
    }

    public createRoom(roomId: string, data: Room): Observable<Room> {
        return this.apiService.put(`/api/v1/rooms/${roomId}`, data).pipe(
            take(1),
            map((data) => data)
        );
    }

    public updateRoom(roomId: string, data: Room): Observable<Room> {
        return this.apiService.put(`/api/v1/rooms/${roomId}`, data).pipe(
            take(1),
            map((data) => data)
        );
    }

    public deleteRoom(roomId: string): Observable<Room> {
        return this.apiService.delete(`/api/v1/rooms/${roomId}`).pipe(
            take(1),
            map((data) => data)
        );
    }
}
