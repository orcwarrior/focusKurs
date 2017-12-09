import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

// TODO: Rename to something more like ApiService
@Injectable()
export class CallService {
  // URLs:
  private apiBaseUrl = 'http://localhost:3000';
  private apiServicesUrls = {
    call: this.apiBaseUrl + '/call',
    status: (phoneNumber) => this.apiBaseUrl + `/status/${phoneNumber}`
  };

  constructor(private http: Http) {}

  public placeCall(number: string): Promise<any> {
    const postData = JSON.stringify({first_number: '500127424', second_number: number});
    const options = this._generateRequestOptions();

    return this.http.post(this.apiServicesUrls.call, postData, options)
      .toPromise()
      .then(this._parseResponseBody);
  }

  public checkStatus(numer: string): Promise<any> {
    const options = this._generateRequestOptions();
    const self = this;
    return this.http.get(this.apiServicesUrls.status(numer), options)
      .toPromise()
      .then(this._parseResponseBody);
  }

  /* private methods*/
  private _generateRequestOptions = function (additionalOptions: Object = {}) {
    const headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    options = Object.assign(options, additionalOptions);
    return options;
  };

  private _parseResponseBody(response) {
    const parsedResponse = Object.assign({}, response);
    parsedResponse.body = JSON.parse(response._body); // _body -> body zamierzone
    return parsedResponse;
  }
}
