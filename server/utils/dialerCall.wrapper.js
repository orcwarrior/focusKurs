import {Connector, CallFactory, Bridge} from 'dialer'
import apiCredentials from './focus.api.credentials'
import {getDialerIdByPhoneNumbers} from './dialerCall.store'
import smartBridge from './dialer.smartBridge'

const connector = new Connector(apiCredentials.url, apiCredentials.login, apiCredentials.password)
const callFactory = new CallFactory(connector);


// Własny dialer oparty na klasie z dodatkowym dostępem do
// instancji Call(i) realizowanych normalnie pod warstwa Bridge
// (Bezpośrednie calle i ich statusy będą przydatne dla
//  wizualizacji na froncie)
class dialerCallWrapper {

  constructor(phoneNumber1, phoneNumber2) {
    this.id = getDialerIdByPhoneNumbers(phoneNumber1, phoneNumber2);
    this.phoneNumbers = [phoneNumber1, phoneNumber2];

    this.promise = this.initializeCall();
  }

  async initializeCall() {
    // This way it'll only populate calls array when both calls are created
    this.calls = await Promise.all([callFactory.create(this.phoneNumbers[0]), callFactory.create(this.phoneNumbers[1])]);
    this.bridge = new Bridge(this.calls[0], this.calls[1], connector);
    smartBridge(this.bridge);
    return this.calls;
  }

  async getCallStatuses() {
    let [call1Status, call2Status] = await Promise.all([this.calls[0].getStatus(), this.calls[1].getStatus()]);
    let bridgeStatus = await this.bridge.getStatus();
    return {userStatus: call1Status, otherStatus: call2Status, bridgeStatus: bridgeStatus};

  }
}

export default function dialerCall(phoneNumber1, phoneNumber2) {
  let dialer = new dialerCallWrapper(phoneNumber1, phoneNumber2);
  // Returns whole dialer when Call(s) are initialized:
  return dialer.promise.then(() => dialer);
}
