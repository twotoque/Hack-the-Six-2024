import { Outlet } from "react-router-dom"
import SideNav from "./SideNav"

function Layout() {
  return (
    <div className="relative flex flex-row w-screen h-screen overflow-hidden">
      <SideNav />
      <div id="detail" className="flex grow max-w-2/3 overflow-hidden">
        <div className="flex flex-col grow justify-start overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
