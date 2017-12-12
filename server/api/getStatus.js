import {getStatus} from '../controllers/getStatus'

export function apiStatusParamBridgeId(req, res, next, bridgeId) {
  req.dialerId = bridgeId;
  next();
}

export async function apiStatus(req, res) {
  let statuses = await getStatus(req.dialerId);
  return res.json(statuses);
}
