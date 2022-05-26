module.exports = async (req, res, next) => {
  //JWT AUTH MIDDLEWARE

  //Get authorization header value (token)
  const token = req.headers["x-access-token"];

  //Token format
  //Authorization: Beared <access_token>

  //Check if a token was provided
  if (token) {
    const decodedToken = await jwt.verify(token, "secretkey");
    req.token = decodedToken;
    next();
  } else {
    res.json({ msg: "No token was provided." });
  }
};
