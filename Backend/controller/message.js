const { fetchmsg } = require("../service/message");
module.exports = {
  fetchmsg: async (req, res) => {
    try {
     const _id=req.params.id
      const fetch_response = await fetchmsg(_id);
      if(fetch_response.error){
      return res.send({ error :fetch_response.error})
      }
      return res.send({response : fetch_response.response})
      } catch (error) {
      return res.send({ error :fetch_response.error})
    }
  },
};
