import React from "react"
import { Link } from "react-router-dom"

import { UserCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/outline"

function SideNav() {
  let iconParams = "size-12 text-gray-200"
  return (
    <div className="h-screen items-center pt-20 w-16 shrink-0 grow-0 bg-gray-900 flex flex-col">
      <Link to="/">
        <CalendarDaysIcon className={iconParams} />
      </Link>
      <Link to="/profile">
        <UserCircleIcon className={iconParams} />
      </Link>
    </div>
  )
}

export default SideNav
