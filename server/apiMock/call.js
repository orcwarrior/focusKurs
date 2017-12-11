export async function mockApiCall(req, res) {
  return res.json({
    status: 'SUCCESS',
    msg: 'Udaje ze nawiazałem połączenie',
    dialerId: null, dialer: null,
    userNumber: 500600700
  })
}
