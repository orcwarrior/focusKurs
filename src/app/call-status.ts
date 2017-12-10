import {Injectable} from "@angular/core";

@Injectable()
export class CallStatus {
  private statusMsgs: Object = {
    'RINGING': 'Trwa wybieranie numeru...',
    'CONNECTED': 'Telefon dzwoni...',
    'ANSWERED': 'Połączenie nawiązane!',
    'FAILED': 'Błąd w nawiązywaniu połączenia!',
    'NO ANSWER': 'Połączenie nieodebrane!',
    'BUSY': 'Połączenie odrzucone!',
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
