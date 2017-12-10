import {Connector, CallFactory, Bridge} from 'dialer';
import apiCredentials from './focus.api.credentials'
import {getDialerIdByPhoneNumbers} from './dialerCall.store'

const connector = new Connector(apiCredentials.url, apiCredentials.login, apiCredentials.password)
const callFactory = new CallFactory(connector);

// Własny dialer oparty na klasie z dodatkowym dostępem do
// instancji Call(i) realizowanych normalnie pod warstwa Bridge
// (Bezpośrednie calle i ich statusy będą przydatne dla
//  wizualizacji na froncie)
class dialerCallWrapper {
  public id = null;
  public phoneNumbers = [];
  public calls = null; // Array [0,1] of Call instances
  public bridge = null; // Bridge (between calls) instance

  constructor(phoneNumber1, phoneNumber2) {
    this.id = getDialerIdByPhoneNumbers(phoneNumber1, phoneNumber2);
    this.phoneNumbers[0] = phoneNumber1;
    this.phoneNumbers[1] = phoneNumber2;

    this.promise = this.initializeCall();
  }

  async initializeCall() {
    // This way it'll only populate calls array when both calls are created
    this.calls = await Promise.all([callFactory.create(this.phoneNumbers[0]), callFactory.create(this.phoneNumbers[1])]);
    this.bridge = new Bridge(this.calls[0], this.calls[1], connector);
  }

  async getCallStatuses() {
    let [call1Status, call2Status] = await Promise.all([this.calls[0].getStatus(), this.calls[1].getStatus()]);
    return {userStatus: call1Status, otherStatus: call2Status};

  }
}

export default function dialerCall(phoneNumber1, phoneNumber2) {
  let dialer = new dialerCallWrapper(phoneNumber1, phoneNumber2);
  // Returns whole dialer when Call(s) are initialized:
  return dialer.promise.then(() => dialer);
}
