import {apiCall} from './api/call'
import {apiStatus} from "./api/getStatus";
import {apiStatusParamBridgeId} from './api/getStatus'

// import {mockGetStatus} from './apiMock/getStatus';
// import {mockApiCall} from './apiMock/call'

export default function (app) {

  app.post('/call', apiCall);
  app.get('/status/:dialerId', apiStatus);

  app.param('dialerId', apiStatusParamBridgeId);
}
