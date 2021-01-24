import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  background-color: '#f8f9fa';
`

const Layout = ({ children }) => <StyledLayout>{children}</StyledLayout>

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
