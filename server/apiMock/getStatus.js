const CALLSTATUS = {
  RINGING: 'RINGING',
  CONNECTED: 'CONNECTED',
  ANSWERED: 'ANSWERED',
  FAILED: 'FAILED',
  'NO ANSWER': 'NO ANSWER',
  BUSY: 'BUSY'
}
const BRIDGESTATUS = {
  NEW: "NEW",
  READY: "READY",
  PENDING: "PENDING",
  BRIDGED: "BRIDGED",
  FINISHED: "FINISHED",
  FAILED: "FAILED"
}

let statusVariantizer = 0;
let dialersStoreMock = {};

function getNextStatus(status, variant) {
  if (status === CALLSTATUS.RINGING)
    if (variant % 5 === 4) return CALLSTATUS.FAILED;
    else return CALLSTATUS.CONNECTED;
  else if (status === CALLSTATUS.CONNECTED) {
    if (Math.random() % 10 > 5) return status;
    else if (variant < 4) return CALLSTATUS.ANSWERED;
    else {
      let statuses = ['FAILED', 'NO ANSWER', 'BUSY', 'ANSWERED'];
      let rndIdx = Math.ceil((Math.random() % 8) / 4);
      return statuses[rndIdx];
    }
  }
  else return status;
}

function updateBridge(dialMock) {
  if (dialMock.calls > 2 && dialMock.bridgeStatus === BRIDGESTATUS.NEW) {
    return BRIDGESTATUS.READY;
  }
  else if (dialMock.userStatus === CALLSTATUS.CONNECTED
    && dialMock.otherStatus === CALLSTATUS.CONNECTED) {
    return BRIDGESTATUS.BRIDGED;
  }
  else return dialMock.bridgeStatus;
}

function finishCall(dialMock) {
  return {
    success: false,
    statuses: {
      userStatus: dialMock.userStatus,
      otherStatus: dialMock.otherStatus,
      bridgeStatus: BRIDGESTATUS.FINISHED
    }
  }
}

export async function mockGetStatus(req, res) {
  let dialMock;
  if (!dialersStoreMock[req.dialerId]) {
    statusVariantizer++;
    dialMock = dialersStoreMock[req.dialerId] = {
      userStatus: CALLSTATUS.RINGING, otherStatus: CALLSTATUS.RINGING,
      bridgeStatus: BRIDGESTATUS.NEW,
      calls: 0, var: statusVariantizer
    };
  } else {
    dialMock = dialersStoreMock[req.dialerId];

    if (++dialMock.calls % 3 === 0) dialMock.otherStatus = getNextStatus(dialMock.otherStatus, dialMock.var);
    if (dialMock.calls % 6 === 5) dialMock.userStatus = getNextStatus(dialMock.userStatus, dialMock.var + -1);
    dialMock.bridgeStatus = updateBridge(dialMock);

    if (dialMock.calls + (Math.random() % 10) > 22) {
      delete dialersStoreMock[req.dialerId];
      return res.json(finishCall(dialMock));
    }

  }
  return res.json({
    success: false,
    statuses: {
      userStatus: dialMock.userStatus,
      otherStatus: dialMock.otherStatus,
      bridgeStatus: dialMock.bridgeStatus
    }
  });
}
