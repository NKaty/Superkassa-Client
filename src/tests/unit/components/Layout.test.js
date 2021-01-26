import React from 'react'
import { render } from '@testing-library/react'
import Layout from '../../../components/Layout'

describe('<Layout />', () => {
  it('should render the Layout component with children', () => {
    const props = {
      children: 'Test',
      dataTestID: 'layout',
    }

    const component = render(<Layout {...props} />)
    const layout = component.queryByTestId('layout')

    expect(layout.textContent).toBe('Test')
  })
})
