const axios = require('axios')
const baseUrl = process.env.REACT_APP_BASE_URL;

async function getAllProducts(username, password, email, phoneNumber){
    const result = await axios.post(baseUrl + "/user/signup", {
        username: username,
        password: password,
        email: email,
        phoneNumber: phoneNumber
    })
    
    return result.data.message
}

async function logIn(username, password){
    const result = await axios.post(baseUrl + "/user/login", {
        username: username,
        password: password
    })

    return result.data.userId
}

export { getAllProducts, logIn }