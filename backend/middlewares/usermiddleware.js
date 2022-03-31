const User = require("../models/users");
module.exports = (req, res, next) => {
  let { username, email } = req.body;
  console.log("username", username);
  let userOb = User.findOne({ username });
  console.log("userOb", userOb);
  if (!userOb) {
    res.json({ status: 1, debug_data: "user does not exist" });
  } else {
    console.log("before next()");
    //pass the request to next function handler
    next();
  }
};
