import {getDialer} from "../utils/dialerCalls.store";

const DIALER_ERR_STATUS = 'NODE: CALL NOT FOUND';

export function apiStatusParamBridgeId(req, res, next, bridgeId) {
  req.dialerId = bridgeId;
  next();
}

export async function apiStatus(req, res) {
  let dialer = getDialer(req.dialerId);
  if (!dialer)
    return res.json({
      success: false,
      statuses: {
        userStatus: DIALER_ERR_STATUS,
        otherStatus: DIALER_ERR_STATUS
      }
    });
  else {
    let statuses = await dialer.getCallStatuses();
    res.json({success: true, statuses: statuses});
  }
}
