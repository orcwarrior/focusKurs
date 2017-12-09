import {Injectable} from '@angular/core'
import {Http, Response, RequestOptions, Headers} from "@angular/http"
import {post} from "selenium-webdriver/http"

@Injectable()
export class CallService {
  private apiUrl = 'http://localhost:3000'
  private callStatus = null
  _generateRequestOptions = function (additionalOptions = {}) {
    const headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers})
    options = Object.assign(options, additionalOptions);
    return options;
  }

  _parseResponseBody(response) {
    response._body = JSON.parse(response._body);
    return response;
  }

  constructor(private http: Http) {
  }

  // Metoda place call od teraz zwraca obietnice (Promise)
  // stat składnia nazwa_funkcji(parametry) : typ_zwracanej_wartosci
  placeCall(number: string): Promise<any> {
    const postData = JSON.stringify({first_number: '500127424', second_number: number})
    const options = this._generateRequestOptions();
    
    return this.http.post(this.apiUrl + "/call", postData, options)
      .toPromise() // obietnica / Promise
      .then(function (response) {
        return response;
      });
  }

  checkStatus(numer: string): Promise<any> {
    const options = this._generateRequestOptions();
    let self = this;
    return this.http.get(this.apiUrl + '/status/' + numer, options)
      .toPromise()
      .then(function (response) {
        return self._parseResponseBody(response);
      })
  }


}
