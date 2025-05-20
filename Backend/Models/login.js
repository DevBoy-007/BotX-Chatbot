const UserTable = require("../schemas/users");
module.exports = {
  Login: async (data) => {
    try {
      const res = await UserTable.findOne({useremail:data.useremail});
      return { response: res };
    } catch (error) {
      return { error: error.message };
    }
  },
};
