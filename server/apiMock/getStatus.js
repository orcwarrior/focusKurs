let dialersStoreMock = {};
const STATUSES = {
  RINGING: 'RINGING',
  CONNECTED: 'CONNECTED',
  ANSWERED: 'ANSWERED',
  FAILED: 'FAILED',
  'NO ANSWER': 'NO ANSWER',
  BUSY: 'BUSY'
}
let statusVariantizer = 0;

function getNextStatus(status, variant) {
  if (status === STATUSES.RINGING)
    if (variant % 5 === 4) return STATUSES.FAILED;
    else return STATUSES.CONNECTED;
  else if (status === STATUSES.CONNECTED) {
    if (Math.random()%10 > 5) return status;
    else if (variant < 4) return STATUSES.ANSWERED;
    else {
      let statuses = ['FAILED', 'NO ANSWER', 'BUSY', 'ANSWERED'];
      let rndIdx = Math.ceil((Math.random() % 8) / 4);
      return statuses[rndIdx];
    }
  }
  else return status;
}

export async function mockGetStatus(req, res) {
  let dialMock;
  if (!dialersStoreMock[req.dialerId]) {
    statusVariantizer++;
    dialMock = dialersStoreMock[req.dialerId] = {
      userStatus: STATUSES.RINGING, otherStatus: STATUSES.RINGING,
      calls: 0, var: statusVariantizer
    };
  } else {
    dialMock = dialersStoreMock[req.dialerId];

    if (++dialMock.calls % 3 === 0) dialMock.otherStatus = getNextStatus(dialMock.otherStatus, dialMock.var);
    if (dialMock.calls % 6 === 5) dialMock.userStatus = getNextStatus(dialMock.userStatus, dialMock.var + -1);
  }
  return res.json({
    success: false,
    statuses: {
      userStatus: dialMock.userStatus,
      otherStatus: dialMock.otherStatus
    }
  });
}
