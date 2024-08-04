import React from "react"
import { useState } from "react"
import Movie from "../../pages/Movie/Movie.js"
import { Link } from "react-router-dom"
import "./moviebutton.css"

const inputStyle = {
  backgroundColor: "#EDECEC",
}

function MovieButton({ movie }) {
  // Movie object:
  // movie.title
  // movie.image
  return (
    <>
      <Link
        to={`/event/${movie.slug}`}
        className="rounded-xl overflow-hidden shadow-none hover:shadow-[0px_0px_10px_rgba(0,0,0,1)] hover:scale-105 hover:-translate-y-1 transition-all "
      >
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center justify-center relative">
          <img className="" src={movie.header}></img>
          <div className="absolute text-xl font-medium text-center pt-3 text-white text-shadow">
            {movie.title}
          </div>
        </div>
      </Link>
    </>
  )
}

export default MovieButton
