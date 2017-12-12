import {getDialer} from "../utils/dialerCall.store";

const DIALER_ERR_STATUS = 'NODE: CALL NOT FOUND';

export async function getStatus(dialerId) {
  let dialer = getDialer(dialerId);
  if (!dialer)
    return {
      success: false,
      statuses: {
        userStatus: DIALER_ERR_STATUS,
        otherStatus: DIALER_ERR_STATUS,
        bridgeStatus: 'FAILED' // Dat quickfix
      }
    };
  else {
    let statuses = await dialer.getCallStatuses();
    return {success: true, statuses: statuses};
  }
}
