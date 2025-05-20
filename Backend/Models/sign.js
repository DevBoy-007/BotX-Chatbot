const UserTable = require("../schemas/users");
module.exports = {
  Signup: async (data) => {
    try {
      const response = await UserTable.create(data);
      return { response:'You has registerd '} ;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
