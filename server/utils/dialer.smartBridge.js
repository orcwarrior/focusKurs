// TODO: Move to smartBridge
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitUntilIsNotPending(bridge) {
  let bridgeStatus = null;
  do {
    bridgeStatus = await bridge.getStatus();
    // debug('check status', bridgeStatus);
    if (bridgeStatus === bridge.STATUSES.PENDING) {
      await timeout(500);
    }
  } while (bridgeStatus === bridge.STATUSES.PENDING)
  return bridgeStatus;
}

export default async function smartBridge(bridge) {
  let isNotPendingStatus = await waitUntilIsNotPending(bridge);
  if (isNotPendingStatus === bridge.STATUSES.READY) {
    return bridge.bridge()
      .catch(function (error) {
        // debug('catch', error);
        return false;
      });
  }
  return false;
}
