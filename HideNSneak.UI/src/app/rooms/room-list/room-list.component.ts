import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoomsService } from './../shared/rooms.service';
import { Room } from './../shared/models/rooms.model';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit, OnDestroy {
    public rooms: Room[] = [];

    private unsubscribe$ = new Subject<void>();

    constructor(private roomsService: RoomsService) {}

    ngOnInit() {
        this.loadRooms();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public loadRooms() {
        this.roomsService
            .getAllRooms()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.rooms = data;
            });
    }
}
