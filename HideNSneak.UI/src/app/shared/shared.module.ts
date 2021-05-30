import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpRequestInterceptor } from '../core/interceptors/http-request.interceptor';

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
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true,
        },
    ],
})
export class SharedModule {}
