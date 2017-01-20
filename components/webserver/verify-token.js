module.exports = token => {
  return function verifyTokenMiddleware (req, res, next) {
    // If token isn't set, we're not verifying
    if (!token) {
      return next()
    }

    let verifyToken = (req.body || {}).token

    // slash command payloads are "weird" - check if that's what we have here
    if (!verifyToken && req.body.payload) {
      try {
        let payload = JSON.parse(req.body.payload)
        verifyToken = payload.token
      } catch (e) {
        return res.send('Error parsing payload')
      }
    }

    // test verify token
    console.log('token: %s - verifyToken: %s', token, verifyToken)
    if (token !== verifyToken) {
      console.log('Invalid verify token')
      res.status(403).send('Invalid verify token')
      return
    }

    next()
  }
}
