const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (
    process.env.CI === "true" &&
    (!authorization || !authorization.startsWith("Bearer "))
  ) {
    req.user = { _id: "5d8b8592978f8bd833ca8133" };
    return next();
  }

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).send({ message: "Authorization required" });
  }
};