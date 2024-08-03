import { Outlet } from "react-router-dom"
import SideNav from "./SideNav"

function Layout() {
  return (
    <div className="flex flex-row">
      <SideNav />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
