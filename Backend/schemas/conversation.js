const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now, // Timestamp for when the conversation is created
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const ConversationTable = mongoose.model("ConversationTable", conversationSchema);

module.exports = ConversationTable;
