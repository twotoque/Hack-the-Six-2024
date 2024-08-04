import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import ShowButton from "../components/Shows.jsx"
import ShowTime from "../components/TheatreShow.jsx"

// Importing venue photos
import CinemaPark from "../venue-images/cinema-park.jpg"
import Scotiabank from "../venue-images/scotiabank.jpg"
import DefaultCinemaImage from "../venue-images/default-venue-header.jpeg"
import Glenn from "../venue-images/glenn-gould-studio.jpg"
import Wales from "../venue-images/princess-of-wales.jpg"
import Alexandra from "../venue-images/royal-alexandra-theatre.jpg"
import Lightbox from "../venue-images/tiff-lightbox.jpg"

function TheatreBanner({ theatre, shows }) {
    console.log(theatre)

  let imagePointer;
    /// Developers note: Because we cannot dynamically access venue-images I've declared them as variables and checked theatre.name 
  if (theatre.name === "Scotiabank Theatre Toronto") {
    imagePointer = Scotiabank;
  } else if (theatre.name === "TIFF Bell Lightbox") {
    imagePointer = Lightbox;
  } else if  (theatre.name === "Royal Alexandra Theatre") {
    imagePointer = Alexandra;
  } else if  (theatre.name === "Visa Screening Room at the Princess of Wales Theatre") {
    imagePointer = Wales;
  }else if  (theatre.name === "Canadian Broadcasting Centre") {
    imagePointer = DefaultCinemaImage;
  }else if  (theatre.name === "TIFF Bell Lightbox, 6th Floor") {
    imagePointer = Lightbox;
  }else {
    imagePointer = DefaultCinemaImage;
  }

  return (

      <div className=" relative text-white">
      
        <img
          style={{ margin: 0, padding: 0 }}
          class="absolute w-full z-[-1] h-48 object-cover "
          src={imagePointer}
        />
        <div className="text-left theatrepadding pt-10 pb-10 ">
          <h2 className="text-3xl font-bold drop-shadow-2xl">{theatre.name}</h2>
          <p className="drop-shadow-2xl">{theatre.address}</p>
        </div>
        <ShowTime></ShowTime>
        

      </div>
  )
}

export default TheatreBanner
