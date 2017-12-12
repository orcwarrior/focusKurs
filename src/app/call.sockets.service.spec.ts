import { TestBed, inject } from '@angular/core/testing';

import { Call.SocketsService } from './call.sockets.service';

describe('Call.SocketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Call.SocketsService]
    });
  });

  it('should be created', inject([Call.SocketsService], (service: Call.SocketsService) => {
    expect(service).toBeTruthy();
  }));
});
