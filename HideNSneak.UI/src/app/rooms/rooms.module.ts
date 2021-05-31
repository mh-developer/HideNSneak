import { NgModule } from '@angular/core';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomListComponent } from './room-list/room-list.component';
import { SharedModule } from '../shared/shared.module';
import { RoomJoinComponent } from './room-join/room-join.component';
import { RoomCreateComponent } from './room-create/room-create.component';
import { RoomLobbyComponent } from './room-lobby/room-lobby.component';
import { RoomDetailsComponent } from './room-details/room-details.component';

@NgModule({
    declarations: [
        RoomListComponent,
        RoomDetailsComponent,
        RoomCreateComponent,
        RoomJoinComponent,
        RoomLobbyComponent,
    ],
    imports: [SharedModule, RoomsRoutingModule],
})
export class RoomsModule {}
