import React from "react"
import { useState } from "react"
import Movie from "../../pages/Movie.js"
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
      <Link to={`/pages/Movie/${movie.slug}`} className="rounded-xl overflow-hidden">
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center justify-center relative">
          <img class="overflow-hidden" src={movie.header}></img>
          <div class="absolute text-xl font-medium text-center pt-3 text-white text-shadow">
            {movie.title}
          </div>
        </div>
      </Link>
    </>
  )
}

export default MovieButton
