const axios = require('axios')

async function signUp(username, password, email, phoneNumber){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/user/signup", {
        username: username,
        password: password,
        email: email,
        phoneNumber: phoneNumber
    })
    
    return result.data.message
}

async function logIn(username, password){
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/user/login", {
        username: username,
        password: password
    })

    return result.data.userId
}

export { signUp, logIn }