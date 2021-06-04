import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpRequestInterceptor } from './http-request.interceptor';

describe('HttpRequestInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [HttpRequestInterceptor],
        })
    );

    it('should be created', () => {
        const interceptor: HttpRequestInterceptor = TestBed.inject(
            HttpRequestInterceptor
        );
        expect(interceptor).toBeTruthy();
    });
});
