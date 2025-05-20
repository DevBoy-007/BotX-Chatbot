const { fetchmsg } = require("../Models/message");
module.exports = {
  fetchmsg: async (_id) => {
    console.log(_id, "message service");
    try {
      const fetch_response = await fetchmsg(_id);
      if(fetch_response.error){
         return { error :fetch_response.error};
      }
      return {response : fetch_response.response}
    } catch (error) {
      return { error :error.message};
    }
  },
};
