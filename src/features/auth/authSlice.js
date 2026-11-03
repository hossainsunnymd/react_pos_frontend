import { createSlice } from '@reduxjs/toolkit'

const safeParse = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return null
  }
}

const initialState = {
  user: safeParse('auth_user'),
  token: localStorage.getItem('auth_token') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(user))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer

// selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => Boolean(state.auth.token)
export const selectUserRole = (state) => state.auth.user?.role || null