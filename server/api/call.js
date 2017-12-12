import {call} from '../controllers/call'

export async function apiCall(req, res) {
  let callResponse = await call(req.body.userNumber, req.body.otherNumber);
  return res.json(callResponse);

}
