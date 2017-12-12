import {Injectable} from '@angular/core';

@Injectable()
export class BridgeStatus {
  private statusMsgs: Object = {
    'NEW': 'Tworzenie mostka...',
    'READY': 'Mostek gotowy...',
    'PENDING': 'Mostek wiąże połączenia',
    'BRIDGED': 'Połączenia zmostkowane!',
    'FINISHED': 'Zakończenie połączeń',
    'FAILED': 'Błąd mostka!'
  };

  constructor() {
  }
  public getBridgeStatus(status: string) {
    return this.statusMsgs[status];
  }
}
