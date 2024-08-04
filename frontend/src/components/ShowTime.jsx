import { useAuth0 } from "@auth0/auth0-react"
import React from "react"
function ShowTime({ film, show }) {
  const { user, isLoading } = useAuth0()

  const toggleSelect = () => {
    if (isLoading || !user) {
    }
    // Fetch info re: user.
  }

  console.log("SHOW", show)
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
        onClick={() => toggleSelect()}
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
