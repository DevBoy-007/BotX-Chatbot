const MessageTable =require('../schemas/message');
module.exports={
  Submit:async(body)=>{
  try{
     submit_response=await MessageTable.create(body);
     return { response : submit_response};
  }catch(error){
     return {error : error.message};
  }
  }     
}