import logo from "../logo.svg"
import { useEffect, useState } from "react"
import MovieButton from "../../components/MovieList/MovieButton.jsx"
import ProfileButtonWhite from "../../components/ProfileButtonWhite.jsx"
import profileImage from "../../profileImage.png"
import ozBanner from "../../ozbanner.png"
import scotiabankTheatre from "../../scotiabank.png"
import TheatreBanner from "../../components/Theatre.jsx"
import { useParams } from "react-router-dom"
import axios from "axios"

function Movie() {
  const { slug } = useParams()

  const [data, setData] = useState({})
  const [screenings, setScreenings] = useState({})
  const [screeningsByTheatre, setScreeningsByTheatre] = useState({})
  const [theatres, setTheatres] = useState([])

  useEffect(() => {
    return async () => {
      await axios
        .post("/movie", { slug: slug })
        .then((res) => {
          console.log(res.data[0])
          setData(res.data[0])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  useEffect(() => {
    if (data._id) {
      getScreenings(data._id)
    }
  }, [data])

  const getScreenings = async (id) => {
    var screenings = await axios.post("/screening", { film: id }).then((res) => {
      console.log("SCREENINGS:", res.data)
      return res.data
      // setScreenings(res.data)
    })
    // Get all the auditoriums these screenings are in.
    var audits = await axios.post("/venue/auditoriums").then((res) => {
      return res.data
    })
    var venues = await axios.post("/venue").then((res) => {
      return res.data
    })
    console.log("AUDITS", audits)
    console.log("VENUES", venues)
    console.log("SCREENINGS", screenings)

    var result = generateLists(audits, venues, screenings)
    // if (screeningsByTheatre == {}) setScreeningsByTheatre(result[0])
    // theatres = [...new Set(theatres)]
    // if (theatres == []) setTheatres(Array.from(new Set(result[1])))
  }

  const generateLists = (audits, venues, screenings) => {
    console.log("GENERATE LISTS")
    var scrByTh = {}
    var theatresLocal = []
    for (let i = 0; i < screenings.length; i++) {
      let scr = screenings[i]
      console.log("SCR->", scr)
      for (let j = 0; j < audits.length; j++) {
        let audit = audits[j]
        if (audit._id == scr.auditorium) {
          for (let k = 0; k < venues.length; k++) {
            let venue = venues[k]
            if (venue._id == audit.venue) {
              if (!(venue in theatresLocal)) theatresLocal.push(venue)
              if (!scrByTh[venue.name]) {
                scrByTh[venue.name] = []
              }
              scr.auditorium = audit.name
              scrByTh[venue.name] = [...scrByTh[venue.name], scr]
            }
          }
        }
      }
    }
    theatresLocal = [...new Set(theatresLocal)]
    console.log("SCRBYTH", scrByTh)
    console.log("theatresLocal", theatresLocal)
    if (theatres.length == 0) setTheatres(theatresLocal)
    setScreeningsByTheatre(scrByTh)
  }

  const movie = {
    title: "Wizard of Oz",
    banner: ozBanner,
    description:
      "The Wizard of Oz is a classic tale that follows a young girl named Dorothy who is swept away by a tornado to the magical land of Oz. To find her way back home to Kansas, she embarks on a journey to see the Wizard of Oz, accompanied by a scarecrow, a tin man, and a cowardly lion. Along the way, they confront various challenges and learn valuable lessons about courage, friendship, and self-discovery.",
    id: 11,
  }
  const profile = { name: "John Doe", image: profileImage, id: 1234 }

  const parser = new DOMParser()

  return (
    <div className=" h-screen flex flex-col">
      <div className="relative picture min-h-80 max-h-96 flex-grow-0 flex-shrink border-b-4 border-gray-900">
        <h1 className="absolute bottom-2 w-full ml-8 text-7xl text-white font-bold text-left drop-shadow-lg">
          {data.title}
        </h1>
        <img
          style={{ margin: 0, padding: 0 }}
          className="absolute w-full h-full object-cover z-[-1]"
          src={data.header}
        />
        <div className="textpadding">
          <div className="pt-24">
            <div className=" flex flex-row items-start justify-between"></div>
          </div>
        </div>
      </div>
      <div className="mt-2 the-rest overflow-scroll flex-grow flex flex-col items-center">
        <div className="w-full pt-4 flex items-center flex-col">
          <h2 className="max-w-2xl text-center border-b-2 border-b-gray-900 mb-2 pb-2">
            {parser.parseFromString(data.descriptionShort, "text/html").body.firstChild.innerHTML}
          </h2>
        </div>
        <div className="theatres w-11/12 max-w-2xl pb-8">
          {theatres?.map((venue) => {
            console.log("VENUE ->", venue)
            var scrSet = screeningsByTheatre[venue.name]
            return <TheatreBanner key={venue.id} film={data.title} theatre={venue} shows={scrSet} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Movie
