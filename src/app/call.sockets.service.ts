import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from "../environments/environment";

// DK: Service should be easily to swap with call.service
// based on HTTP Requests
@Injectable()
export class CallSocketsService {
  private socketsUrl = 'http://localhost:3001';
  private socketCreated = false;
  private socket; // io
  private dialerId;
  constructor() {
  }

  public placeCall(numer: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.socketCreated) {
        this._connectWithEndpoint();
      }
      this.socket.emit('call', {userNumber: numer, otherNumber: environment.otherNumber},
        (response) => {
        this.dialerId = response.dialerId;
        resolve(response);
        });
    });
  }

  // NOTE: Generic way of swaping call.sockets with call.(http)
  // is not in par with way of calling (server itself could notify
  // about new status by socket event).
  public checkStatus(numer: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('status', this.dialerId, (response) => resolve(response.statuses));
    });
  }

  private _connectWithEndpoint() {
    this.socket = io(this.socketsUrl); // Docs says socket instance wouldn't be duplicated anyway..
    this.socketCreated = true;
  }
}
