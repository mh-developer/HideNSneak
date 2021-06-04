import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ForgetPage } from './forget.page';

describe('ForgetPage', () => {
    let component: ForgetPage;
    let fixture: ComponentFixture<ForgetPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ForgetPage],
            imports: [IonicModule.forRoot(), RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ForgetPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
