import React from "react"
import { Link } from "react-router-dom"
import backArrow from "../BackArrow.svg"

function ProfileTitle({ profile }) {
  // Profile object:
  // profile.name
  // profile.image
  return (
    <>
      <div className="flex flex-row pr-max items-center">
        <img className="w-20 h-20 mr-3" src={profile.image}></img>
        <div className="text-5xl font-bold text-right pl-3 ">{profile.name}</div>
        {profile.nickname}
      </div>
    </>
  )
}

export default ProfileTitle
