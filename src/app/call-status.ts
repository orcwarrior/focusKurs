export class CallStatus {
  private static statusMsgs = {
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

  getStatusMsg(status: string) {
    return CallStatus.statusMsgs(status);
  }
}
