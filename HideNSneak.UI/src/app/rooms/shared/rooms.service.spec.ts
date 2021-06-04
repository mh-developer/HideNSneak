import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
    let service: RoomsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(RoomsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
