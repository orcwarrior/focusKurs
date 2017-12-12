import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {environment} from "../environments/environment";

// TODO: Rename to something more like ApiService
@Injectable()
export class CallService {
  // URLs:
  private apiBaseUrl = 'http://localhost:3001';
  private apiServicesUrls = {
    call: this.apiBaseUrl + '/call',
    status: (dialerId) => this.apiBaseUrl + `/status/${dialerId}`
  };
  private phoneNumberToDialerIdMap = {}; // overengineered

  constructor(private http: Http) {}

  public placeCall(numer: string): Promise<any> {
    const postData = JSON.stringify({userNumber: numer, otherNumber: environment.otherNumber});
    const options = this._generateRequestOptions();

    return this.http.post(this.apiServicesUrls.call, postData, options)
      .toPromise()
      .then(this._parseResponseBody)
      .then(this._storeBridgeIdInDictionary.bind(this));
  }

  public checkStatus(numer: string): Promise<any> {
    const dialerId = this.phoneNumberToDialerIdMap[numer];
    const options = this._generateRequestOptions();
    return this.http.get(this.apiServicesUrls.status(dialerId), options)
      .toPromise()
      .then(this._parseResponseBody)
      // This will make it 1:1 with call.sockets.service:
      .then((response) => response.body.statuses);
  }

  /* private methods*/
  private _generateRequestOptions = function (additionalOptions: Object = {}) {
    const headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    options = Object.assign(options, additionalOptions);
    return options;
  };
  private _storeBridgeIdInDictionary(response) {
    this.phoneNumberToDialerIdMap[response.body.userNumber] = response.body.dialerId;
    return response;
  }
  private _parseResponseBody(response) {
    const parsedResponse = Object.assign({}, response);
    parsedResponse.body = JSON.parse(response._body); // _body -> body zamierzone
    return parsedResponse;
  }
}
