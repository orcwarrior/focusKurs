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

  public getStatusMsg(status: string) {
    return this.statusMsgs[status];
  }
}
