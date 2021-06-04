import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { RoomDetailsComponent } from './room-details.component';

describe('RoomDetailsComponent', () => {
    let component: RoomDetailsComponent;
    let fixture: ComponentFixture<RoomDetailsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [RoomDetailsComponent],
                imports: [
                    IonicModule.forRoot(),
                    RouterTestingModule,
                    HttpClientTestingModule,
                ],
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
