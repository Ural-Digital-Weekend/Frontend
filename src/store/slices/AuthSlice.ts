import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean
  access: string
  username: string
}

const ACCESS_KEY = 'dc-access'
const USERNAME_KEY = 'dc-username'
const EXPIRES_KEY = 'dc-expires'

function getInitialState(): AuthState {
  const expiresIn = localStorage.getItem(EXPIRES_KEY) ?? null

  if (expiresIn && new Date() > new Date(expiresIn)) {
    return {
      isAuthenticated: false,
      access: '',
      username: ''
    }
  }

  return {
    isAuthenticated: Boolean(localStorage.getItem(ACCESS_KEY) ?? ''),
    access: localStorage.getItem(ACCESS_KEY) ?? '',
    username: localStorage.getItem(USERNAME_KEY) ?? ''
  }
}

const initialState: AuthState = getInitialState()

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
      localStorage.removeItem(ACCESS_KEY)
      localStorage.removeItem(USERNAME_KEY)
      localStorage.removeItem(EXPIRES_KEY)
    },
    loginSuccess(state, action: PayloadAction<AuthPayload>) {
      state.access = action.payload.access
      state.username = action.payload.username
      state.isAuthenticated = Boolean(action.payload.access)

      const tokenExpires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

      localStorage.setItem(ACCESS_KEY, action.payload.access)
      localStorage.setItem(USERNAME_KEY, action.payload.username)
      localStorage.setItem(EXPIRES_KEY, tokenExpires.toString())
    }
  }
})

export default authSlice.reducer