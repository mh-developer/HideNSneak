import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { RoomLobbyComponent } from './room-lobby.component';

describe('RoomLobbyComponent', () => {
    let component: RoomLobbyComponent;
    let fixture: ComponentFixture<RoomLobbyComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [RoomLobbyComponent],
                imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
            }).compileComponents();

            fixture = TestBed.createComponent(RoomLobbyComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
