import logo from "./logo.svg"
import "./Home/Home.css"
import { useEffect, useState } from "react"
import MovieButton from "../components/MovieList/MovieButton.jsx"
import ProfileTitle from "../components/ProfileTitle.jsx"
import badlandsImage from "../badlands.jpg"
import profileImage from "../ProfileImage.svg"


function Profile() {

  const profile = { name: "John Doe", image: profileImage, id: 1234 }
  return (
    <div>
        <div class="flex flex-row">
            <ProfileTitle key={profile.id} profile={profile}/>
        </div>
    </div>
  )
}

export default Profile
