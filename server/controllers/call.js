import dialerCall from '../utils/dialerCall.wrapper'
import {setDialer, getDialerIdByPhoneNumbers} from '../utils/dialerCall.store'
import apiCredentials from '../utils/focus.api.credentials'

export async function call(userNumber, otherNumber = apiCredentials.servicePhoneNumber) {
  let dialer, dialerId = getDialerIdByPhoneNumbers(userNumber, otherNumber);
  try {
    dialer = await dialerCall(userNumber, otherNumber);
  } catch (dialerError) {
    console.error(dialerError.stack);
    if (!dialerError.__canBeIgnored) {
      return {
        status: 'ERROR',
        msg: 'Nawiazywanie połaczenia nieudane z powodu wystąpienia błędu',
        err: dialerError.stack,
        dialerId: null, dialer: dialer,
        userNumber: userNumber
      };
    }
  } finally {
    setDialer(dialerId, dialer)
  }
  return {
    status: 'SUCCESS',
    dialerId: dialerId, dialer: dialer,
    userNumber: userNumber
  };
}
