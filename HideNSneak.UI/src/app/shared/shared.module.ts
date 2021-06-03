import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpRequestInterceptor } from '../core/interceptors/http-request.interceptor';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
    ],
    providers: [
        NativeGeocoder,
        Geolocation,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true,
        },
    ],
})
export class SharedModule {}
