"use client"

import { useEffect, useState } from "react"
import MovieButton from "../../components/MovieList/MovieButton.jsx"
import ProfileTitle from "../../components/ProfileTitle.jsx"
import ProfileButton from "../../components/ProfileButtonWhite.jsx"
import ShowTime from "../../components/ShowTime.jsx"
import ClipLoader from "react-spinners/ClipLoader.js"
import { useAuth0 } from "@auth0/auth0-react"

import { CalendarDaysIcon, PlusIcon } from "@heroicons/react/24/outline"

import { Link, useNavigate } from "react-router-dom"

function Profile() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({ user_metadata: { schedule: [], friends: [] } })
  const { user, isLoading, isAuthenticated } = useAuth0()

  useEffect(() => {
    if (!user && !isLoading) {
      navigate(`/`, { replace: true }) // <-- redirect
    }
  })

  const friends = [
    {
      username: "josh-hartnett",
      email: "rkjhrjkr@gmail.com",
      image:
        "https://d2dmyh35ffsxbl.cloudfront.net/assets/defaults/no-avatar-100-b164b29ca37cbce6b6dbcf4d61d40ba7a3081dfd121a32e2a773eb8f018f0a1f.png",
    },
    {
      username: "will.alt",
      email: "will.gotlib2@freeemail.tv",
      image: "https://avatars.githubusercontent.com/u/37600983?height=180&v=4&width=180",
    },
    {
      username: "sana.ashraf",
      email: "sana.ashraf@sympatico.ca",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJSfdAUjMI0lfr5XzvYGjq2TYWcC5OTWj3xlXejD7v8zBQ=s96-c?height=180&width=180",
    },
    {
      username: "neiloy.chaudhuri",
      email: "neiloy.chaudhuri@hotmail.net",
      image:
        "https://d112y698adiu2z.cloudfront.net/photos/production/user_photos/001/783/307/datas/profile.JPG",
    },
    {
      username: "derek.song",
      email: "derek.song@yahoo.com",
      image:
        "https://d2dmyh35ffsxbl.cloudfront.net/assets/defaults/no-avatar-100-b164b29ca37cbce6b6dbcf4d61d40ba7a3081dfd121a32e2a773eb8f018f0a1f.png",
    },
  ]

  return (
    isAuthenticated && (
      <>
        <div className="flex flex-col w-full h-screen">
          <div className="text-3xl underline pt-6">{user.nickname}</div>
          <div class="flex flex-row pt-8 h-full">
            <div class="flex flex-col w-1/2 border-r-2 border-gray-800">
              <h2 class="text-3xl pt-5 ">Upcoming shows </h2>
              {userData.user_metadata?.schedule.map((show) => (
                <div>{/* <TheatreShow key={show.id} show={show} /> */}</div>
              ))}
            </div>
            <div class="flex flex-col w-1/2 border-l-2 border-gray-800">
              <h2 class="text-3xl pt-5 ">Friends </h2>
              <button className="flex w-36 h-16 border-4 rounded-lg border-blue-600 bg-gray-200 hover:bg-gray-300 transition-colors self-center justify-center pr-2 items-center mt-4">
                <div className="w-8 h-8 flex">
                  <PlusIcon className="size=8 text-blue-600" />
                </div>
                Add Friend
              </button>
              <div className="friends-panel flex flex-col w-full items-start pt-4 ps-8">
                {friends.map((friend) => (
                  <div className="h-20 border-0 border-gray-700 rounded-lg flex flex-row items-center justify-center my-4">
                    <div className="w-24 h-24 shrink-0 px-4 flex items-center">
                      <img className=" rounded-full overflow-hidden" src={friend.image} />
                    </div>
                    <div>
                      <h3>{friend.username}</h3>
                      <h4 className="italics">{friend.email}</h4>
                    </div>
                    <Link className="w-16 h-16 ps-4 justify-center flex items-center ">
                      <CalendarDaysIcon className="p-2 border-2 border-gray-800 hover:bg-amber-400 transition-colors rounded-full" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default Profile
