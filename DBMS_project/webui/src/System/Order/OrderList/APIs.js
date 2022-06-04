const axios = require("axios");
const baseUrl = process.env.REACT_APP_BASE_URL;
const userId = window.localStorage.getItem("id_token");

async function updateAmount(productId, amountChange) {
  const result = await axios.post(baseUrl + "/product/updateAmount", {
    userId: userId,
    productId: productId,
    amountChange: amountChange,
  });
  if(result.data.success === true) return amountChange;
  else return 0;
}


async function getTagDict() {
  const result = await axios.post(baseUrl + "/order/getTagDict", {
    userId: userId,
  });
  return result.data.tagDict;
}

async function createTag(tag) {
  const result = await axios.post(baseUrl + "/order/addNewTag", {
    userId: userId,
    tagName: tag,
  });
  if (result.data.success === true) return result.data.message;
  else if (result.data.status === 409) return "標籤已存在";
}

export { updateAmount, createTag, getTagDict };
