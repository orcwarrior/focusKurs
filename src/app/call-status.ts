import {Injectable} from '@angular/core';

@Injectable()
export class CallStatus {
  private statusMsgs: Object = {
    'RINGING': 'Telefon dzwoni...',
    'CONNECTED': 'Połączenie nawiązane!',
    'ANSWERED': 'Połączenie zakończone!',
    'FAILED': 'Błąd w nawiązywaniu połączenia!',
    'NO ANSWER': 'Połączenie nieodebrane!',
    'BUSY': 'Numer zajęty',
    // Dodatkowe błedy z poziomu node:
    'NODE: CALL NOT FOUND': 'Ządane połączenie nieodnalezione (API niezarejestrowało połączenia z tym numerem).'
  };

  constructor() { }

  public getCallStatusMsg(status: string) {
    return this.statusMsgs[status];
  }
  public getUnsucessfulCallStatuses(): Array<string> {
    return ['FAILED', 'NO ANSWER', 'BUSY', 'NODE: CALL NOT FOUND'];
  }
}
