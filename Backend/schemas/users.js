const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
     unique: true,
  },
  userpassword: {
    type: String,
    required: true,
  },
 });
const UserTable = mongoose.model("UserTable", userSchema);
module.exports = UserTable;

