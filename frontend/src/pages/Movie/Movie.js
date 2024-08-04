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
  // const [venues, ]
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
      getScreenings()
    }
  }, [data])

  const getScreenings = async () => {
    await axios.post("/screening", { film: data._id }).then((res) => {
      console.log(res.data)
      setScreenings(res.data)
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
    var scrByTh = {}
    var theatresLocal = []
    for (const scr in screenings) {
      for (let audit of audits) {
        if (audit._id == scr.auditorium) {
          for (let venue of venues) {
            if (venue._id == audit.venue) {
              theatresLocal.push(venue.name)
              if (!scrByTh[venue.name]) {
                scrByTh[venue.name] = []
              }
              let scr2 = scr
              scr2.auditorium = audit.name
              scrByTh[venue.name].push(scr2)
            }
          }
        }
      }
    }
    console.log(scrByTh)
    setScreeningsByTheatre(scrByTh)
    // theatres = [...new Set(theatres)]
    console.log(theatresLocal)
    setTheatres(theatresLocal)
  }

  useEffect(() => {
    console.log(theatres)
  }, [theatres])

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
    <div>
      <div className="relative ">
        <img
          style={{ margin: 0, padding: 0 }}
          className="absolute w-full h-96 object-cover z-[-1]"
          src={data.header}
        />
        <div className="textpadding">
          <div className=" flex flex-row items-start justify-end">
            <ProfileButtonWhite styles="text-white" key={profile.id} profile={profile} />
          </div>
          <div className="pt-24">
            <div className=" flex flex-row items-start justify-between">
              <h1 className="text-7xl text-white font-bold text-left">{data.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="textpadding">
        <h2 className="text-left">
          {parser.parseFromString(data.descriptionShort, "text/html").body.firstChild.innerHTML}
        </h2>
        <div className="flex text-left pt-10 gap-2">
          <h2 className="text-3xl ">Coming dates for </h2>
          <h2 className="text-3xl font-bold ">
            {" "}
            <button>Select date</button>{" "}
          </h2>
        </div>
      </div>
      {theatres}
      {theatres.map((theatre) => {
        return (
          <div>
            <TheatreBanner key={theatre.id} theatre={theatre} shows={screenings} />
          </div>
        )
      })}
    </div>
  )
}

export default Movie
