import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ApiService } from '../../core/api/api.service';
import { PlayerLocation } from './models/game.model';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(private apiService: ApiService) {}

    public pingLocation(location: PlayerLocation): Observable<PlayerLocation> {
        return this.apiService.post(`/api/v1/locations/ping`, location).pipe(
            take(1),
            map((data) => data)
        );
    }

    public notifyLocation(location: PlayerLocation): Observable<PlayerLocation> {
        return this.apiService.post(`/api/v1/locations/notify`, location).pipe(
            take(1),
            map((data) => data)
        );
    }
}
