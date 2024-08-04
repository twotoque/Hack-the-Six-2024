import logo from "../logo.svg"
import "./Home.css"
import { useEffect, useState } from "react"
import MovieButton from "../../components/MovieList/MovieButton.jsx"
import ProfileButton from "../../components/ProfileButton.jsx"
import badlandsImage from "../../badlands.jpg"
import profileImage from "../../profileImage.png"

import axios from "axios"
import { Auth0Context, useAuth0 } from "@auth0/auth0-react"
import LoginButton from "../../components/layout/LoginButton.jsx"

function Home() {
  const [movieData, setMovieData] = useState([])

  useEffect(() => {
    axios.post("/movie", {}).then((res) => {
      setMovieData(res.data)
    })
  }, [])

  const { user } = useAuth0()

  return (
    <div className="flex h-screen flex-col">
      <div className="px-8 pt-8 flex flex-row items-start justify-between border-b-2 border-b-gray-800 ">
        <h1 className="text-7xl font-bold text-left">Tiff-Tok</h1>
        <h3 className="self-center">Est. 2024</h3>
      </div>
      <div className="overflow-scroll">
        <div className="px-8 pt-6">
          <h3 className="text-3xl text-left pt-4">An easy way to RSVP and view movie times</h3>
          <form className="max-w-md mx-auto ml-0 mt-3 mb-3">
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 border-white text-sm text-gray-900 border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                placeholder="What are you feeling?"
                required
              />
              <button
                type="submit"
                className="absolute end-2.5 bottom-2.5 bg-background-orange focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="py-8 grid grid-cols-3 lg:grid-cols-4 gap-4  px-12 lg:px-8 items-stretch">
          {false ? (
            <div className="min-w-full"></div>
          ) : (
            movieData.map((movie) => <MovieButton key={movie.id} movie={movie} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
