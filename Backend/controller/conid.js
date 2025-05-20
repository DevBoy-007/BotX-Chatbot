const ConversationTable = require("../schemas/conversation");
module.exports={
   makeid:async(req,res)=>{
      try{
       await ConversationTable.create(req.body);
       const lastConversation = await ConversationTable.findOne().sort({ _id: -1 });
     if (lastConversation) {
         const newconid = lastConversation._id;
         console.log("Last Conversation ID:", newconid);
         res.send({ newconid });
       } else {
         res.send({ message: "conversation Fail" });
       }
       }catch(error){
        return {
         error:error.message
        }
       }
}
   }     
