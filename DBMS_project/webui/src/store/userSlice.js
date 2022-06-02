import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '', 
    loggedIn: false
 },
  reducers: {
    login(state, action) {
        state =  {
            userId: action.payload.userId,
            loggedIn: true
        }
    },
    logout(state, action) {
        state = {
            userId: '',
            loggedIn: false
        }
    }
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer