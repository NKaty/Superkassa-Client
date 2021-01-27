import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../../store/slices'
import App from '../../containers/App'
import { render, fireEvent } from '@testing-library/react'
import { socket, serverSocket, cleanUp } from 'socket.io-client'

const customRender = (component, initialStore = {}, options = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialStore,
  })
  const customProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  return render(component, { wrapper: customProvider, ...options })
}

describe('App', () => {
  afterEach(() => {
    cleanUp()
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should emit new-connection event on mount', () => {
    jest.spyOn(socket, 'emit')
    customRender(<App />)

    expect(socket.emit).toHaveBeenCalledTimes(1)
    expect(socket.emit.mock.calls[0][0]).toEqual('new-connection')
  })

  it('should subscribe on set-state and connect_error events', () => {
    jest.spyOn(socket, 'on')
    customRender(<App />)

    expect(socket.on).toHaveBeenCalledTimes(2)
    expect(
      [socket.on.mock.calls[0][0], socket.on.mock.calls[1][0]].sort()
    ).toEqual(['connect_error', 'set-state'].sort())
  })

  it('should emit toggle-state event on button click', () => {
    const app = customRender(<App />)
    jest.spyOn(socket, 'emit')
    const button = app.getByRole('button')
    fireEvent.click(button)

    expect(socket.emit).toHaveBeenCalledTimes(1)
    expect(socket.emit.mock.calls[0][0]).toEqual('toggle-state')
  })

  it('should change the button state on set-state event', () => {
    const app = customRender(<App />, {
      button: { isActive: true, socketError: false },
    })
    const button = app.getByRole('button')
    serverSocket.emit('set-state', false)
    const buttonText = button.textContent

    expect(buttonText).toEqual('Off')
  })

  it('should render the button as disabled on connect_error event', () => {
    const app = customRender(<App />, {
      button: { isActive: true, socketError: false },
    })
    serverSocket.emit('connect_error')
    const button = app.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('should not render the button as disabled after the connection is restored', () => {
    const app = customRender(<App />, {
      button: { isActive: true, socketError: true },
    })
    serverSocket.emit('set-state', false)
    const button = app.getByRole('button')

    expect(button).not.toBeDisabled()
  })
})
