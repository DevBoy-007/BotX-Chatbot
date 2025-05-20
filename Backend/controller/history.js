const { fetchchat } = require("../service/history");
const { deletechat } = require("../service/history");
module.exports = {
  fetchchat: async (req, res) => {
    try {
      const fetch_response = await fetchchat();
      if (fetch_response.error) {
        return res.send({ error: fetch_response.error });
      }
      return res.send({ response: fetch_response.response });
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
  deletechat: async (req, res) => {
    try {
      const conid = req.params.id;
      const delete_response = await deletechat(conid);
      if (delete_response.error) {
        return res.send({ error: delete_response.error });
      }
      return res.send({ response: delete_response.response });
    } catch (error) {
       return res.send({ error: error.message});
    }
  },
};
