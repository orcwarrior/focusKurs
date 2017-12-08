import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CallService} from "../call.service";

@Component({
  selector: 'app-ringing',
  templateUrl: './ringing.component.html',
  styleUrls: ['./ringing.component.css']
})
export class RingingComponent implements OnInit {
  private numer: number;
  private status: string;
  constructor(private route: ActivatedRoute, private callService: CallService) {

  }
  updateCallStatus() {

    this.status = "Nowy status pobrany z serwera na 3000...";
  }
  ngOnInit() {
    // Należy zachować referencje do this, jako że w wywołaniu funkcji
    // assignNumerFromParams kontekst this ulegnie zmianie i nie będzie wskazywało
    // na nasz komponent do którego chcemy przypisać pole numer.
    let self = this;
    this.route.params.subscribe(function assignNumerFromParams(params) {
      self.numer = params.numer;
      self.callService.placeCall(self.numer);
    })
  }

}
