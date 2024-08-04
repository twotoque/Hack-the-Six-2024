import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <button
      className="text-white hover:bg-gray-800 transition-colors rounded-lg border-2 border-white p-2"
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    >
      <div>Log</div>
      <div>Out</div>
    </button>
  )
}

export default LogoutButton
