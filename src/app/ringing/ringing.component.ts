import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CallService} from '../call.service';
import  {CallStatus} from '../call-status';

@Component({
  selector: 'app-ringing',
  templateUrl: './ringing.component.html',
  styleUrls: ['./ringing.component.css']
})
export class RingingComponent implements OnInit {
  private numer: string;
  private status: string;
  private statusMsg: string;

  constructor(private route: ActivatedRoute, private callService: CallService, private callStatus: CallStatus) {

  }

  _getStatusMsg(status) {
    // Sprytnie odczytujemy wiadomość wyświetlana dla użytkownika wg.
    // statusu przekazanego do tej metody.
    return this.callStatus.getStatusMsg(status);
  }

  private _watchCallStatus() {
    const callStatusInterval = setInterval(() => {
      this.callService.checkStatus(this.numer)
        .then((response) => {
            this.status = response.body.status;
            this.statusMsg = this._getStatusMsg(response.body.status);
            if (this.isCallEnded()) {
              // Usuniecie odpytywania o status kiedy poł. zakonczono
              clearInterval(callStatusInterval);
            }
          }
        );
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
    this.route.params.subscribe((params) => {
      this.numer = params.numer;
      this.callService.placeCall(this.numer)
        .then(() => {
          this._watchCallStatus();
        });
    });
  }

}
