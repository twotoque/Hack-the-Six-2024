import logo from "./logo.svg"
import "./Home/Home.css"
import { useEffect, useState } from "react"
import MovieButton from "../components/MovieList/MovieButton.jsx"
import ProfileTitle from "../components/ProfileTitle.jsx"
import badlandsImage from "../badlands.jpg"
import profileImage from "../ProfileImage.svg"
import ProfileButton from "../components/ProfileButton.jsx"
import TheatreShow from "../components/TheatreShow.jsx"

function Profile() {
  const profile = { name: "John Doe", image: profileImage, id: 1234 }
  const [friendsData, setFriends] = useState([
    { name: "LeBron James", image: profileImage, id: 421412 },
    { name: "Simone Biles", image: profileImage, id: 32145 },
    { name: "Michael Phelps", image: profileImage, id: 63234 },
  ])
  const [showsData, setShows] = useState([
    { title: "Wizard of Oz", startTime: "2023-09-12 20:45:00", theatre: "Bell Lightbox", id: 1029 },
    { title: "Wizard of Oz", startTime: "2023-09-12 10:45:00", theatre: "Bell Lightbox", id: 1028 },
    { title: "Wizard of Oz", startTime: "2023-09-12 19:25:00", theatre: "Bell Lightbox", id: 1030 },
  ])
  return (
    <div class="flex flex-col w-full">
      <ProfileTitle key={profile.id} profile={profile} />
      <div class="flex flex-row justify-between w-full">
        <div class="flex flex-col">
          <h2 class="text-3xl pt-5 ">Upcoming shows </h2>
          {showsData.map((show) => (
            <div>
              <TheatreShow key={show.id} show={show} />
            </div>
          ))}
        </div>
        <div class="flex flex-col">
          <h2 class="text-3xl pt-5 ">Friends </h2>
          {friendsData.map((friends) => (
            <div>
              <ProfileButton key={friends.id} profile={friends} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
