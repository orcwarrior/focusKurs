import { Injectable } from '@angular/core'
import {Http, Response, RequestOptions, Headers} from "@angular/http"
import {post} from "selenium-webdriver/http"

@Injectable()
export class CallService {
  private apiUrl = 'http://localhost:3000'

  constructor(private http: Http) { }

  placeCall(number: string) {
    let postData = JSON.stringify({ first_number: '500127424', second_number: number })
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })
    // let headers ...
    this.http.post(this.apiUrl + "/call", postData, options)
      .toPromise() // obietnica / Promise
      .then(function(response) {
          console.log('Response received:')
          console.log(response);
      });
  }

}
