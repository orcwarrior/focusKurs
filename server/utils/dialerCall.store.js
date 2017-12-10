// TODO: This 'store' could be easily swaped with some more memory-persistent and crash resistant
const dialersStore = {};

export function getDialer(bridgeId) {
  console.log("store: ",dialersStore);
  return dialersStore[bridgeId];
}
export function setDialer(bridgeId, val) {
  return dialersStore[bridgeId] = val;
}
export function getDialerIdByPhoneNumbers(phoneNumber1, phoneNumber2) {
  return `${phoneNumber1}<->${phoneNumber2}`;
}
