import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { RoomCreateComponent } from './room-create.component';

describe('RoomCreateComponent', () => {
    let component: RoomCreateComponent;
    let fixture: ComponentFixture<RoomCreateComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [RoomCreateComponent],
                imports: [
                    IonicModule.forRoot(),
                    HttpClientTestingModule,
                    RouterTestingModule,
                    FormsModule,
                    ReactiveFormsModule,
                ],
            }).compileComponents();

            fixture = TestBed.createComponent(RoomCreateComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
