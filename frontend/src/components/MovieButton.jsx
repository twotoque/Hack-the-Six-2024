import React from "react"
import { useState } from "react"
import Movie from "../pages/Movie.js"
import { Link } from "react-router-dom"

const inputStyle = {
  backgroundColor: "#EDECEC",
}

function MovieButton({ movie }) {
  // Movie object:
  // movie.title
  // movie.image
  return (
    <>
      <Link to={`/pages/Movie/${movie.slug}`}>
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center justify-center relative">
          <img class="max-h-24 overflow-hidden" src={movie.header}></img>
          <div class="absolute text-xl font-medium text-center pt-3 ">{movie.title}</div>
        </div>
      </Link>
    </>
  )
}

export default MovieButton
