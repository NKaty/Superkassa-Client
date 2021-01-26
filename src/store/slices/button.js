import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isActive: false,
  socketError: false,
}

const buttonSlice = createSlice({
  name: 'button',
  initialState: initialState,
  reducers: {
    setButtonState: (state, { payload }) => {
      state.isActive = payload
      state.socketError = false
    },
    setSocketError: state => {
      state.socketError = true
    },
  },
})

export const { setButtonState, setSocketError } = buttonSlice.actions

export default buttonSlice.reducer

export const subscribeOnButtonState = socket => dispatch => {
  if (socket) {
    socket.on('set-state', data => dispatch(setButtonState(data)))
    socket.on('connect_error', () => dispatch(setSocketError()))
    socket.emit('new-connection')
  } else {
    dispatch(setSocketError())
  }
}

export const buttonStateSelector = state => {
  return state.button.isActive
}

export const buttonErrorSelector = state => {
  return state.button.socketError
}
