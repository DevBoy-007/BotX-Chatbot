const { Submit } = require("../Models/user");
module.exports = {
  Submit: async (body) =>{
    try {
      const submit_response = await Submit(body);
      if(submit_response.error){
        return {error:submit_response.error};
      }
      return { response : submit_response.response};
    } catch (error){
      return {error:error.message}; 
    }
  },
};