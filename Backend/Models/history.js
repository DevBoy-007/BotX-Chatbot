const ConversationTable = require("../schemas/conversation");
const MessageTable = require("../schemas/message"); // adjust the path if different

module.exports = {
  fetchchat: async () => {
    try {
      const conversations = await ConversationTable.find(
        {},
        "_id createdAt"
      ).sort({ createdAt: -1 });

      const formattedConversations = await Promise.all(
        conversations.map(async (doc) => {
          const firstPrompt = await MessageTable.findOne(
            { conid: doc._id, sender: "User" },
            "prompt"
          ).sort({ createdAt: 1 }); // first message by user

          return {
            conid: doc._id.toString(),
            title: firstPrompt
              ? firstPrompt.prompt.slice(0, 20) +
                (firstPrompt.prompt.length > 20 ? "..." : "")
              : "No Title",
            date: new Date(doc.createdAt).toLocaleDateString("en-GB"),
          };
        })
      );
      return { response: formattedConversations };
    } catch (error) {
      return { error: error.message };
    }
  },
deletechat: async (conid) => {
    try {
      const delete_response1 = await ConversationTable.findByIdAndDelete(conid);
      const delete_response2 = await MessageTable.deleteMany({ conid: conid });
      return { response: 'Chat has deleted permanently'};
    } catch (error) {
      return { error: error.message };
    }
  },
};
