import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import Button from '../components/Button'
import Layout from '../components/Layout'
import {
  buttonStateSelector,
  buttonErrorSelector,
  subscribeOnButtonState,
} from '../store/slices/button'

const socket = io('/')

const App = ({ isActive, error, subscribeOnButtonState }) => {
  useEffect(() => {
    subscribeOnButtonState(socket)
    return () => {
      if (socket) socket.removeAllListeners()
    }
  }, [subscribeOnButtonState])

  const toggleHandler = event => {
    event.preventDefault()
    socket.emit('toggle-state')
  }

  return (
    <Layout>
      <Button
        btnActive={isActive}
        onClickHandler={toggleHandler}
        disabled={error}
      />
    </Layout>
  )
}

App.propTypes = {
  isActive: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  subscribeOnButtonState: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    isActive: buttonStateSelector(state),
    error: buttonErrorSelector(state),
  }
}

export default connect(mapStateToProps, {
  subscribeOnButtonState,
})(App)
