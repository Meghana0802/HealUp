const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const tokenPart = token.split(' ')[1];

    const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification error: ", err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
