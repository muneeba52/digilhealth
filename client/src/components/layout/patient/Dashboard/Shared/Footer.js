import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="main-footer">
      <strong>Copyright © 2023
        <Link to="/admin/dashboard" className="ml-1 mr-1">DigiHealth</Link>
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0.0
      </div>
    </footer>
  )
}

export default Footer
