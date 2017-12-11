import apiCall from './api/call'
import {apiStatusParamBridgeId} from './api/getStatus'
import {mockGetStatus} from "./apiMock/getStatus";
import {apiStatus} from "./api/getStatus";

export default function (app) {
  app.post('/call', apiCall);

  app.param('dialerId', apiStatusParamBridgeId);
  app.get('/status/:dialerId', apiStatus);
}
