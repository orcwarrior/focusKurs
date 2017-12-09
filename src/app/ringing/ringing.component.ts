import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CallService} from "../call.service";

@Component({
  selector: 'app-ringing',
  templateUrl: './ringing.component.html',
  styleUrls: ['./ringing.component.css']
})
export class RingingComponent implements OnInit {
  private numer: string;
  private status: string;
  private statusMsg: string;
  private statusMsgDictionary = {
    'RINGING': 'Trwa wybieranie numeru...',
    'CONNECTED': 'Telefon dzwoni...',
    'ANSWERED': 'Połączenie nawiązane!',
    'FAILED': 'Błąd w nawiązywaniu połączenia!',
    'NO ANSWER': 'Połączenie nieodebrane!',
    'BUSY': 'Połączenie odrzucone!',
    // Dodatkowe błedy z poziomu node:
    'NODE: CALL NOT FOUND': 'Ządane połączenie nieodnalezione (API niezarejestrowało połączenia z tym numerem).'
  };

  constructor(private route: ActivatedRoute, private callService: CallService) {

  }

  _getStatusMsg(status) {
    // Sprytnie odczytujemy wiadomość wyświetlana dla użytkownika wg.
    // statusu przekazanego do tej metody.
    return this.statusMsgDictionary[status];
  }

  private _watchCallStatus() {
    var self = this;
    let callStatusInterval = setInterval(function () {
      self.callService.checkStatus(self.numer)
        .then(function (response) {
          self.status = response._body.status;
          self.statusMsg = self._getStatusMsg(response._body.status);
          if (self.isCallEnded()) {
            // Usuniecie odpytywania o status kiedy poł. zakonczono
            clearInterval(callStatusInterval);
          }
        });
    }, 1000);
  }

  isCallEnded() {
    if (this.status === 'FAILED'
      || this.status === 'NO ANSWER'
      || this.status === 'BUSY'
      || this.status === 'NODE: CALL NOT FOUND') {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnInit() {
    // Należy zachować referencje do this, jako że w wywołaniu funkcji
    // assignNumerFromParams kontekst this ulegnie zmianie i nie będzie wskazywało
    // na nasz komponent do którego chcemy przypisać pole numer.
    var self = this;
    this.route.params.subscribe(function assignNumerFromParams(params) {
      self.numer = params.numer;
      self.callService.placeCall(self.numer)
        .then(function () {
          self._watchCallStatus();
        })
    })
  }

}
