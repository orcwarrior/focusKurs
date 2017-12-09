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

  constructor(private route: ActivatedRoute, private callService: CallService, private callStatus: CallStatus) { }


  public isCallEnded() {
    return this.status === 'FAILED'
      || this.status === 'NO ANSWER'
      || this.status === 'BUSY'
      || this.status === 'NODE: CALL NOT FOUND';
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.numer = params.numer;
      this.callService.placeCall(this.numer)
        .then(() => {
          this._watchCallStatus();
        });
    });
  }

  /* private methods */
  private _watchCallStatus() {
    const callStatusInterval = setInterval(() => {
      this.callService.checkStatus(this.numer)
        .then((response) => {
            this.status = response.body.status;
            this.statusMsg = this.callStatus.getStatusMsg(this.status);
            if (this.isCallEnded()) {
              // Usuniecie odpytywania o status kiedy poł. zakonczono
              clearInterval(callStatusInterval);
            }
          }
        );
    }, 1000);
  }


}
