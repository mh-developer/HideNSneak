import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ApiService } from '../../core/api/api.service';
import { PlayerLocation } from './models/game.model';
import { environment } from '../../../environments/environment';
import Pusher from 'pusher-js/with-encryption';
import { MapSettings } from './models/map.model';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    private pusher: Pusher;

    constructor(private apiService: ApiService) {
        this.pusher = new Pusher(environment.PUSHER.APP_KEY, {
            cluster: environment.PUSHER.APP_CLUSTER,
        });
    }

    public pingLocation(location: PlayerLocation): Observable<PlayerLocation> {
        return this.apiService.post(`/api/v1/locations/ping`, location).pipe(
            take(1),
            map((data) => data)
        );
    }

    public notifyOutOfZone(
        location: PlayerLocation
    ): Observable<PlayerLocation> {
        return this.apiService.post(`/api/v1/locations/notify`, location).pipe(
            take(1),
            map((data) => data)
        );
    }

    public getChannel(channel: string) {
        return this.pusher.subscribe(channel);
    }

    public getAllLocations(): Observable<MapSettings[]> {
        return this.apiService.get(`/api/v1/locations`).pipe(
            take(1),
            map((data) => data)
        );
    }

    public getLocation(locationId: string): Observable<MapSettings> {
        return this.apiService.get(`/api/v1/locations/${locationId}`).pipe(
            take(1),
            map((data) => data)
        );
    }

    public createLocation(location: MapSettings): Observable<MapSettings> {
        return this.apiService.post(`/api/v1/locations/`, location).pipe(
            take(1),
            map((data) => data)
        );
    }

    public updateLocation(
        locationId: string,
        location: MapSettings
    ): Observable<MapSettings> {
        return this.apiService
            .put(`/api/v1/locations/${locationId}`, location)
            .pipe(
                take(1),
                map((data) => data)
            );
    }

    public deleteLocation(locationId: string): Observable<MapSettings> {
        return this.apiService.delete(`/api/v1/locations/${locationId}`).pipe(
            take(1),
            map((data) => data)
        );
    }
}
