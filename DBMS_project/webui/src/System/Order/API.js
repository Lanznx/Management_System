const axios = require('axios')
const baseUrl = process.env.REACT_APP_BASE_URL;

async function getAllProducts(){
    const result = await axios.post(baseUrl + "/product/getAllProducts", {
        userId: "6cc4a5be-08ba-41de-946d-a2e5c6ed43c2",
    })
    console.log(result.data);
    return result.data.allProductInformation
}

async function logIn(username, password){
    const result = await axios.post(baseUrl + "/user/login", {
        username: username,
        password: password
    })

    return result.data.userId
}

export { getAllProducts, logIn }