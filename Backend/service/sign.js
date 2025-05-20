const { Signup } = require("../Models/sign");
const bcrypt = require("bcrypt");
module.exports = {
  Signup: async (data) => {
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(data.userpassword,10);
      // Replace the plain password with the hashed one
      data.userpassword = hashedPassword;
      data.useremail=data.useremail.toLowerCase();
      const response = await Signup(data);
      if (response.error) {
        return { error: response.error };
      }
      return {response : response.response };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
