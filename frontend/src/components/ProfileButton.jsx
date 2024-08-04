import React from "react"
import { Link } from "react-router-dom"

function ProfileButton({ profile }) {
  return (
    <>
      <Link to="/profile">
        <div className="flex items-center">
          <img class="max-h-12" src={profile.image}></img>
          <div className="text-xl font-medium text-right pl-3 ">{profile.name}</div>
        </div>
      </Link>
    </>
  )
}

export default ProfileButton
