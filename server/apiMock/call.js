export async function mockApiCall(req, res) {
  return res.json({
    status: 'SUCCESS',
    msg: 'Udaje ze nawiazałem połączenie',
    dialerId: `mock${req.body.userNumber}`, dialer: null,
    userNumber: req.body.userNumber
  })
}
