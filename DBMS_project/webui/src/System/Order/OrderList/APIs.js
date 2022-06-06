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

async function getAllOrders() {
  const result = await axios.post(baseUrl + "/order/getAllOrders", {
    userId: userId,
  });

  if(result.data.success === true) return result.data.allOrdersData;
  
  return ["there is an error"];
}

async function updateOrder(orderId, orderData, tagId, totalPrice) {
  const result = await axios.post(baseUrl + "/order/updateOrder", {
    userId: userId,
    orderId: orderId,
    orderData: orderData,
    tagId: tagId,
    totalPrice: totalPrice,
  });
  if(result.data.success === true) return true;

  return false;
}


async function deleteOrder(orderId) {
  const result = await axios.post(baseUrl + "/order/deleteOrder", {
    userId: userId,
    orderId: orderId,
  });
  if(result.data.success === true) return true;

  return false;
}



export { updateAmount, createTag, getTagDict, getAllOrders, deleteOrder, updateOrder };
