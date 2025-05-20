const { Submit } = require("../service/user");
module.exports = {
  Submit: async (req, res) => {
    try {
      const submit_response = await Submit(req.body);
      if (submit_response.error){
        return res.send(submit_response.error);
      }
      return res.send(submit_response.response);
    } catch (error) {
      return res.send(submit_response.error);
    }
  },
};
