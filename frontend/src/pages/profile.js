import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  const addFriend = () => {}

  user.app_metadata = { friends: ["1", "2"] }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>App Metadata: {JSON.stringify(user.app_metadata)}</p>
        <button
          onClick={() => {
            console.log(user.app_metadata)
            user.app_metadata = { friends: [...user.app_metadata.friends, "extra"] }
          }}
        >
          Add Friend
        </button>
        {user.picture}
        <p>{user.nickname}</p>
      </div>
    )
  )
}

export default Profile
