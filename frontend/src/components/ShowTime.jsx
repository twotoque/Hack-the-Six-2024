import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import React, { useState } from "react"
function ShowTime({ show, userPicks, toggle }) {
  const { user, isLoading } = useAuth0()

  const [pressed, setPressed] = useState(false)

  const toggleSelect = (e) => {
    console.log("Event:", e)
    console.log(userPicks)
    var found = false
    for (let i in userPicks) {
      if (userPicks[i] == show._id) {
        console.log("TURNING OFF")
        found = true
        e.target.closest("button").style.color = "white"
      }
    }
    if (!found) e.target.closest("button").style.color = "green"
    // if (userPicks.contains(show._id)) {
    // } else {
    // }
    console.log("META:", user?.user_metadata)
    if (isLoading || !user || pressed) {
      return
    }
    setPressed(true)
    var res = toggle(show._id)
    setPressed(false)
  }

  const dayOf = new Date(show.startTime).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  })

  const startTime = new Date(show.startTime).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const endTime = new Date(show.endTime).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <>
      <button
        onClick={toggleSelect}
        className={`p-6 mb-8 w-5/12 mx-2 bg-gray-900 rounded-xl shadow-lg flex flex-col text-left items-left 
      ${
        show.ticketType == "regular"
          ? "border-0"
          : show.ticketType == "premium"
          ? "border-e-8 border-amber-400"
          : "border-e-8 border-r-blue-600"
      }`}
      >
        <div className="text-xl font-medium text-black ">{show.auditorium}</div>
        <h2 className="text-black">
          {dayOf}, {startTime} - {endTime}
        </h2>
        <h4 className="italic">{show.ticketType.toUpperCase()}</h4>
      </button>
    </>
  )
}

export default ShowTime
