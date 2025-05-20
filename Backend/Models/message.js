const MessageTable = require("../schemas/message");
module.exports = {
  fetchmsg: async (_id) => {
    try {
      const messages = await MessageTable.find({ conid: _id }).sort({
        timestamp: 1,
      });
      return { response: messages };
    } catch (error) {
      return { error: error.message };
    }
  },
};
