const axios = require('axios')

async function signUp(username, password, email, phoneNumber){
    const result = await axios.post(process.env.REACT_APP_BASE_URL + "/users/signup", {
        username: username,
        password: password,
        email: email,
        phoneNumber: phoneNumber
    })
    
    return result.data.message
}

async function logIn(username, password){
    const result = await axios.post(process.env.REACT_APP_BASE_URL + "/users/login", {
        username: username,
        password: password
    })

    if(result.data.userId)
        return result.data.userId
    else
        return result.data.message
}

export { signUp, logIn }