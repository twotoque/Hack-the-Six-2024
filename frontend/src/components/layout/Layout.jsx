import { Outlet } from "react-router-dom"
import SideNav from "./SideNav"

function Layout() {
  return (
    <div className="relative flex flex-row w-screen h-screen overflow-hidden">
      <SideNav />
      <div id="detail" className="flex grow overflow-hidden">
        <div className="flex justify-center px-24 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
