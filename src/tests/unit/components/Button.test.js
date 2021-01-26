import React from 'react'
import { render } from '@testing-library/react'
import Button from '../../../components/Button'

describe('<Button />', () => {
  it('should render the Button component as active', () => {
    const props = {
      btnActive: true,
      onClickHandler: jest.fn,
      disabled: false,
      dataTestID: 'button',
    }

    const component = render(<Button {...props} />)
    const button = component.queryByTestId('button')

    expect(button.textContent).toBe('On')
  })

  it('should render the Button component as inactive', () => {
    const props = {
      btnActive: false,
      onClickHandler: jest.fn,
      disabled: false,
      dataTestID: 'button',
    }

    const component = render(<Button {...props} />)
    const button = component.queryByTestId('button')

    expect(button.textContent).toBe('Off')
  })

  it('should render the Button component as disabled', () => {
    const props = {
      btnActive: true,
      onClickHandler: jest.fn,
      disabled: true,
      dataTestID: 'button',
    }

    const component = render(<Button {...props} />)
    const button = component.queryByTestId('button')

    expect(button).toBeDisabled()
  })
})
