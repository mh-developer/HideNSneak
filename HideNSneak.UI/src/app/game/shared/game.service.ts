import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api/api.service';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(private apiService: ApiService) {}
}
