const { verify } = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  authmiddleware: async (req, res, next) => {

    try {
      console.log( 'cookie here',req.cookies.UserToken);
      if (
        req.cookies.UserToken == undefined ||
        req.cookies.UserToken == null
      ) {
        return res.send({
          error: "Unauthorized User",
        });
      }
      verify(req.cookies.UserToken, process.env.SECRET_KEY, (error, userinfo) => {
        if (error) {
          console.log(error, "secret key not match");
          return res.send({
            error: "Unauthorised User",
          });
        }
         req.user = userinfo;
        next();
      });
    } catch (error) {
      res.send({
        error: error.message,
      });
    }
  },
};
