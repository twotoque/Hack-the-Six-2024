import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import ShowButton from "../components/Shows.jsx"

function TheatreBanner({ theatre, shows }) {
  return (

      <div className=" relative text-white">
        <img
          style={{ margin: 0, padding: 0 }}
          class="absolute w-full z-[-1] "
          src={theatre.image}
        />
        <div className="text-left theatrepadding pt-10 pb-10 ">
          <h2 className="text-3xl font-bold">{theatre.name}</h2>
          <p>{theatre.address}</p>
        </div>

      </div>
  )
}

export default TheatreBanner
