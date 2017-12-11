import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CallService} from '../call.service';
import {CallStatus} from '../call-status';

const statusCheckIntervalMS = 1000;

@Component({
  selector: 'app-ringing',
  templateUrl: './ringing.component.html',
  styleUrls: ['./ringing.component.css']
})

export class RingingComponent implements OnInit {
  private numer: string;
  private userCall = {status: null, msg: null};
  private otherCall = {status: null, msg: null};
  private bridge = {status: null};

  constructor(private route: ActivatedRoute, private callService: CallService, private callStatus: CallStatus) {
  }

  public isCallEnded() {
    // TODO: Should have service providing bridges statuses
    const bridgeStatus = this.bridge.status;
    return bridgeStatus === 'FINISHED' || bridgeStatus === 'FAILED';
  }

  public getCallIconClass(status) {
    return this._stringDasherize(status);
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.numer = params.numer;
      this.callService.placeCall(this.numer)
        .then(() => this._watchCallStatus());
    });
  }


  /* private methods */
  private _stringDasherize(str) {
    return str.replace(' ', '-');
  }

  private _watchCallStatus() {
    const callStatusInterval = setInterval(() => {
      this.callService.checkStatus(this.numer)
        .then((response) => {
            this._assingCallsStatuses(response.body.statuses);
            if (this.isCallEnded()) {
              clearInterval(callStatusInterval);
            }
          }
        );
    }, statusCheckIntervalMS);
  }

  private _assingCallsStatuses(statuses) {
    this.userCall.status = statuses.userStatus;
    this.userCall.msg = this.callStatus.getCallStatusMsg(statuses.userStatus);
    this.otherCall.status = statuses.otherStatus;
    this.otherCall.msg = this.callStatus.getCallStatusMsg(statuses.otherStatus);
    this.bridge = {status: statuses.bridgeStatus};
  }


}
