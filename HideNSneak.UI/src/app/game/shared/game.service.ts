import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ApiService } from '../../core/api/api.service';
import { PlayerLocation } from './models/game.model';
import { environment } from '../../../environments/environment';
import Pusher from 'pusher-js/with-encryption';

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

    public getPlayersLocations() {
        return this.pusher.subscribe('location');
    }

    public whoExitZone() {
        return this.pusher.subscribe('geofence');
    }
}
