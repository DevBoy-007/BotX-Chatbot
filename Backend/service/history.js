const { fetchchat } = require("../Models/history");
const { deletechat } = require("../Models/history");
module.exports = {
  fetchchat: async () => {
    try {
      const fetch_response = await fetchchat();
      if (fetch_response.error) {
        return { error: fetch_response.error };
      }
      return { response: fetch_response.response };
    } catch (error) {
      return { error: error.message };
    }
  },
  deletechat: async (conid) => {
    try {
      const delete_response = await deletechat(conid);
      if (delete_response.error) {
        return { error: delete_response.error };
      }
      return { response: delete_response.response };
    } catch (error) {
      return { error: error.message };
    }
  },
};
