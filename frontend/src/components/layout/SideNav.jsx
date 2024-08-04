import React from "react"
import { Link } from "react-router-dom"

import { UserCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/outline"
import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"

function SideNav() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0()
  let iconParams = "size-12 text-gray-200"
  return (
    <div className="h-screen items-center pt-20 w-16 shrink-0 grow-0 bg-gray-900 flex flex-col">
      <Link to="/">
        <CalendarDaysIcon className={iconParams} />
      </Link>
      <Link to="/profile">
        <UserCircleIcon className={iconParams} />
      </Link>
      <div className="text-white">{user?.name}</div>
      {!isLoading && !user && <LoginButton className="text-white" />}
      {!isLoading && user && <LogoutButton className="text-white" />}
    </div>
  )
}

export default SideNav
