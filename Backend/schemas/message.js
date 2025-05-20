const mongoose=require('mongoose');
const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['User', 'Bot'],
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  conid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConversationTable', // Optional: only if you're grouping messages in sessions
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MessageTable = mongoose.model("MessageTable", messageSchema);

module.exports = MessageTable;

