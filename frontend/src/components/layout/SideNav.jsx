import React from "react"
import { Link } from "react-router-dom"

function SideNav() {
  return (
    <div className="h-screen w-12 bg-white flex">
      <Link to="/profile">PR</Link>
    </div>
  )
}

export default SideNav
