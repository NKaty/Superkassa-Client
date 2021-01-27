let events = {}

const emit = (event, ...args) => {
  if (events[event])
    events[event].forEach(func => {
      func(...args)
    })
}

const on = (event, func) => {
  if (!events[event]) events[event] = []
  events[event].push(func)
}

const removeAllListeners = () => {}

export const cleanUp = () => (events = {})

export const socket = { emit, on, removeAllListeners }

const io = () => socket

export const serverSocket = { emit }

export default io
