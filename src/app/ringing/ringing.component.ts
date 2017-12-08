import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CallService} from "../call.service";

@Component({
  selector: 'app-ringing',
  templateUrl: './ringing.component.html',
  styleUrls: ['./ringing.component.css']
})
export class RingingComponent implements OnInit {
  private numer: string;
  private status: string;
  private statusMsgDictionary = {
    'call' : "Połaczenie wydzwanianie",
    'fail' : "Połaczenie nieudane"
  }
  constructor(private route: ActivatedRoute, private callService: CallService) {

  }
  _getStatusMsg(status) {
    // Sprytnie odczytujemy wiadomość wyświetlana dla użytkownika wg.
    // statusu przekazanego do tej metody.
    return this.statusMsgDictionary[status];
  }
  private _watchCallStatus() {
    var self = this;
    let callStatusInterval = setInterval(function() {
        self.callService.checkStatus(self.numer)
          .then(function (response) {
            self.status = self._getStatusMsg(response.status);
            if (self.status === 'fail' || self.status === 'ended')
              clearInterval(callStatusInterval); // Usuniecie odpytywania o status kiedy poł. zakonczono
          });
    }, 1000);
  }
  ngOnInit() {
    // Należy zachować referencje do this, jako że w wywołaniu funkcji
    // assignNumerFromParams kontekst this ulegnie zmianie i nie będzie wskazywało
    // na nasz komponent do którego chcemy przypisać pole numer.
    var self = this;
    this.route.params.subscribe(function assignNumerFromParams(params) {
      self.numer = params.numer;
      self.callService.placeCall(self.numer)
        .then(function() {
          self._watchCallStatus();
        })
    })
  }

}
