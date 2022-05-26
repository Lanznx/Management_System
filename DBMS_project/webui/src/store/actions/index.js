import { LOGIN, LOGOUT } from "../constants/action-type";

const login = (userId) => {
    return {
        type: LOGIN,
        userId: userId
    }
}

const logout = () => {
    return {
        type: LOGOUT
    }
}

export { login, logout };