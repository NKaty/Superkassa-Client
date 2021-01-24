import { createSlice } from '@reduxjs/toolkit'

const buttonSlice = createSlice({
  name: 'button',
  initialState: {
    isActive: false,
    error: false,
  },
  reducers: {
    getButtonStateSuccess: (state, { payload }) => {
      state.isActive = payload
      state.error = false
    },
    getButtonStateFailure: state => {
      state.error = true
    },
  },
})

export const {
  getButtonStateSuccess,
  getButtonStateFailure,
} = buttonSlice.actions

export default buttonSlice.reducer

export const subscribeOnButtonState = socket => dispatch => {
  if (socket) {
    socket.on('set-state', data => dispatch(getButtonStateSuccess(data)))
    socket.on('connect_error', () => dispatch(getButtonStateFailure()))
    socket.emit('new-connection')
  } else {
    dispatch(getButtonStateFailure())
  }
}

export const buttonStateSelector = state => {
  return state.button.isActive
}

export const buttonErrorSelector = state => {
  return state.button.error
}
