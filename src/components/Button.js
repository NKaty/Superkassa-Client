import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: inline-block;
  color: #fff;
  font-size: 2rem;
  background-color: ${({ btnActive }) => (btnActive ? '#fe7968' : '#ffbdb3')};
  height: 150px;
  width: 150px;
  margin: 1rem;
  padding: 0;
  border: 2px solid #a83b24;
  border-radius: 50%;
  cursor: pointer;

  :not([disabled]):hover {
    color: #fff;
    background-color: ${({ btnActive }) => (btnActive ? '#ec4f43' : '#fe948d')};
  }

  :disabled {
    opacity: 0.3;
  }
`

const Button = ({ btnActive, onClickHandler, disabled }) => (
  <StyledButton
    btnActive={btnActive}
    onClick={onClickHandler}
    disabled={disabled}
  >
    {btnActive ? 'On' : 'Off'}
  </StyledButton>
)

Button.defaultProps = {
  btnActive: false,
  onClickHandler: () => {},
  disabled: false,
}

Button.propTypes = {
  btnActive: PropTypes.bool,
  onClickHandler: PropTypes.func,
  disabled: PropTypes.bool,
}

StyledButton.propTypes = {
  btnActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default Button