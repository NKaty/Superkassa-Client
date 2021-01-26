import reducer, {
  initialState,
  setButtonState,
  setSocketError,
} from '../../../store/slices/button'

describe('buttonSlice', () => {
  it('should return the initial state on first run', () => {
    const nextState = initialState
    const action = {}
    const result = reducer(undefined, action)

    expect(result).toEqual(nextState)
  })

  it('should set the button state to a new value and socketError to false on setButtonState', () => {
    const payload = true
    const state = {
      isActive: false,
      socketError: true,
    }
    const nextState = {
      isActive: true,
      socketError: false,
    }
    const result = reducer(state, setButtonState(payload))

    expect(result).toEqual(nextState)
  })

  it('should set socketError to true on setSocketError', () => {
    const state = {
      isActive: true,
      socketError: false,
    }
    const nextState = {
      isActive: true,
      socketError: true,
    }
    const result = reducer(state, setSocketError())

    expect(result).toEqual(nextState)
  })
})
