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
  }

  const movie = {
    title: "Wizard of Oz",
    banner: ozBanner,
    description:
      "The Wizard of Oz is a classic tale that follows a young girl named Dorothy who is swept away by a tornado to the magical land of Oz. To find her way back home to Kansas, she embarks on a journey to see the Wizard of Oz, accompanied by a scarecrow, a tin man, and a cowardly lion. Along the way, they confront various challenges and learn valuable lessons about courage, friendship, and self-discovery.",
    id: 11,
  }
  const profile = { name: "John Doe", image: profileImage, id: 1234 }
  const [theatreData, setMovieData] = useState([
    {
      name: "Scotiabank Theatre",
      image: scotiabankTheatre,
      address: "259 Richmond Street West",
      id: 1,
    },
    {
      name: "TIFF Bell Lightbox",
      header: scotiabankTheatre,
      address: "350 King Street West",
      id: 2,
    },
    { name: "Roy Thomson Hall", header: scotiabankTheatre, address: "60 Simcoe Street", id: 3 },
    {
      name: "Princess of Wales Theatre",
      header: scotiabankTheatre,
      address: "300 King Street West",
      id: 4,
    },
    {
      name: "Royal Alexandra Theatre",
      header: scotiabankTheatre,
      address: "260 King Street West",
      id: 5,
    },
    {
      name: "Elgin and Winter Garden Theatre Centre",
      header: scotiabankTheatre,
      address: "189 Yonge Street",
      id: 6,
    },
  ])

  const [shows, setShows] = useState([
    { startTime: "2023-09-12 20:45:00", theatre: 2, id: 1029 },
    { startTime: "2023-09-12 10:45:00", theatre: 2, id: 1028 },
    { startTime: "2023-09-12 19:25:00", theatre: 4, id: 1030 },
  ])

  const parser = new DOMParser()

  return (
    <div>
      <div className="relative ">
        <img
          style={{ margin: 0, padding: 0 }}
          className="absolute w-full z-[-1]"
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
      {theatreData.map((theatre) => (
        <div>
          <TheatreBanner key={theatre.id} theatre={theatre} shows={screenings} />
        </div>
      ))}
    </div>
  )
}

export default Movie
