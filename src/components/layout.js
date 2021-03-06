import * as React from "react"
import PropTypes from "prop-types"
import "./layout.css"
const Layout = ({ children }) => {

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <div
          style={{

            maxWidth: 650,

          }}
        >
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
