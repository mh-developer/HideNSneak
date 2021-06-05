// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { IonicModule } from '@ionic/angular';
// import { environment } from '../../../environments/environment';
// import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { AgmCoreModule } from '@agm/core';

// import { GameSettingsComponent } from './game-settings.component';

// describe('GameSettingsComponent', () => {
//     let component: GameSettingsComponent;
//     let fixture: ComponentFixture<GameSettingsComponent>;

//     beforeEach(
//         waitForAsync(() => {
//             TestBed.configureTestingModule({
//                 declarations: [GameSettingsComponent],
//                 imports: [
//                     HttpClientTestingModule,
//                     IonicModule.forRoot(),
//                     AgmCoreModule.forRoot({
//                         apiKey: environment.MAP_API_KEY,
//                         libraries: ['places', 'geometry'],
//                     }),
//                 ],
//                 providers: [Geolocation, NativeGeocoder],
//             }).compileComponents();

//             fixture = TestBed.createComponent(GameSettingsComponent);
//             component = fixture.componentInstance;
//             fixture.detectChanges();
//         })
//     );

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
