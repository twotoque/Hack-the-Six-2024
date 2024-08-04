import { Outlet } from "react-router-dom"
import SideNav from "./SideNav"

function Layout() {
  return (
    <div className="relative flex flex-row w-screen">
      <SideNav />
      <div id="detail" className="flex grow max-w-2/3">
        <div className="flex flex-col grow justify-start">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
