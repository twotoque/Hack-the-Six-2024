"use client"

import { useEffect, useState } from "react"
import MovieButton from "../../components/MovieList/MovieButton.jsx"
import ProfileTitle from "../../components/ProfileTitle.jsx"
import ProfileButton from "../../components/ProfileButtonWhite.jsx"
import ShowTime from "../../components/ShowTime.jsx"
import ClipLoader from "react-spinners/ClipLoader.js"
import { useAuth0 } from "@auth0/auth0-react"

import { useNavigate } from "react-router-dom"

function Profile() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({ user_metadata: { schedule: [], friends: [] } })
  const { user, isLoading } = useAuth0()

  useEffect(() => {
    if (!user && !isLoading) {
      navigate(`/`, { replace: true }) // <-- redirect
    }
  })

  return (
    user && (
      <>
        <div class="flex flex-col w-full">
          <ProfileTitle key={user.email} profile={user} />
          <div class="flex flex-row justify-between w-full">
            <div class="flex flex-col">
              <h2 class="text-3xl pt-5 ">Upcoming shows </h2>
              {userData.user_metadata?.schedule.map((show) => (
                <div>{/* <TheatreShow key={show.id} show={show} /> */}</div>
              ))}
            </div>
            <div class="flex flex-col">
              <h2 class="text-3xl pt-5 ">Friends </h2>
              {userData.user_metadata?.friends.map((friends) => (
                <div>{/* <ProfileButton key={friends.id} profile={friends} /> */}</div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default Profile
