import dialerCall from '../utils/dialerCallWrapper'
import {setDialer, getDialerIdByPhoneNumbers} from '../utils/dialerCalls.store'
import apiCredentials from '../utils/focus.api.credentials'

export default async function callService(req, res) {
  let [firstPN, secondPN] = [req.body.userNumber,
    req.body.otherNumber || apiCredentials.servicePhoneNumber];
  let dialer;
  let dialerId = getDialerIdByPhoneNumbers(firstPN, secondPN);
  try {
    dialer = await dialerCall(firstPN, secondPN);
    console.log(dialer);
  } catch (dialerError) {
    console.error(dialerError.stack);
    if (!dialerError.__canBeIgnored) {
      return res.json({
        status: 'ERROR',
        msg: 'Nawiazywanie połaczenia nieudane z powodu wystąpienia błędu',
        err: dialerError.stack,
        dialerId: null, dialer: dialer,
        userNumber: firstPN
      })
      }
  } finally {
    setDialer(dialerId, dialer)
  }
  res.json({
    status: 'SUCCESS',
    msg: `Nawiazywanie polaczenia miedzy numerami: ${firstPN}, ${secondPN}...`,
    dialerId: dialerId, dialer: dialer,
    userNumber: firstPN
  })
}
