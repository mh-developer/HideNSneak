import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomDetailsComponent } from './room-details.component';

describe('RoomDetailsComponent', () => {
    let component: RoomDetailsComponent;
    let fixture: ComponentFixture<RoomDetailsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [RoomDetailsComponent],
                imports: [IonicModule.forRoot()],
            }).compileComponents();

            fixture = TestBed.createComponent(RoomDetailsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
