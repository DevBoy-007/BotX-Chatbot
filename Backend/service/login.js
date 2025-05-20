const { Login } = require("../Models/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = {
  Login: async (data) => {
try {
      data.useremail = data.useremail.toLowerCase();
      console.log(data.useremail);
      const userresponse = await Login(data);
      console.log(userresponse);
      if (userresponse.error) {
        return { error: userresponse.error };
      }
      if (userresponse.response === null) {
        return { error: "You are not register" };
      }
      // Make User
      const User=userresponse.response;
      const isMatch = await bcrypt.compare(data.userpassword,User.userpassword);
      if (!isMatch) return { error: "Invalid Userpassword" };

      if (data.username !== User.username) {
        return { error: "Invalid Userame" };
      }
      if (data.useremail !== User.useremail) {
        return { error: "Invalid Userame" };
      }
      const payload = { id: User._id, user:User.username, email: User.useremail };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
      // sending token in response towareds browser
      return {
        response : token
      }
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
