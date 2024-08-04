import React from "react"
import { Link } from "react-router-dom"

function ProfileButton({ profile }) {
  // Profile object:
  // profile.name
  // profile.image
  return (
    <>
      <Link to="./pages/profile.js">
        <div className="flex items-center">
          <img class="max-h-12" src={profile.image}></img>
          <div className="text-xl font-medium text-right pl-3 text-white ">{profile.name}</div>
        </div>
      </Link>
    </>
  )
}

export default ProfileButton
