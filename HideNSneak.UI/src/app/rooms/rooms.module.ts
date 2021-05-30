import { NgModule } from '@angular/core';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomListComponent } from './room-list/room-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [RoomListComponent],
    imports: [SharedModule, RoomsRoutingModule],
})
export class RoomsModule {}
