import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean
  access: string
  username: string
}

const initialState: AuthState = {
  isAuthenticated: Boolean(localStorage.getItem('dc-access') ?? ''),
  access: localStorage.getItem('dc-access') ?? '',
  username: localStorage.getItem('dc-username') ?? ''
}

interface AuthPayload {
  access: string
  username: string
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.access = ''
      state.username = ''
      localStorage.removeItem('dc-access')
      localStorage.removeItem('dc-username')
    },
    registerError() {},
    loginSuccess(state, action: PayloadAction<AuthPayload>) {
      state.access = action.payload.access
      state.username = action.payload.username
      localStorage.setItem('dc-access', action.payload.access)
      localStorage.setItem('dc-username', action.payload.username)
      state.isAuthenticated = Boolean(action.payload.access)
    }
  }
})

export default authSlice.reducer