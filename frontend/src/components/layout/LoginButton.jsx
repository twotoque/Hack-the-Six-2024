import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <button
      className="text-white rounded-lg border-2 border-white p-2 text-white hover:bg-gray-800 transition-colors"
      onClick={() => loginWithRedirect()}
    >
      <div>Log</div>
      <div>In</div>
    </button>
  )
}

export default LoginButton
