import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomJoinComponent } from './room-join.component';

describe('RoomJoinComponent', () => {
    let component: RoomJoinComponent;
    let fixture: ComponentFixture<RoomJoinComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [RoomJoinComponent],
                imports: [IonicModule.forRoot()],
            }).compileComponents();

            fixture = TestBed.createComponent(RoomJoinComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
