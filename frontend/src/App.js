import logo from "./logo.svg"
import { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MovieButton from "./components/MovieButton.jsx"
import ProfileButton from "./components/ProfileButton.jsx"
import badlandsImage from "./badlands.jpg"
import profileImage from "./profileImage.png"
import Home from "./pages/Home.js"
import Movie from "./pages/Movie.js"
import Layout from "./components/layout/Layout.jsx"

function App() {
  const [movieData, setMovieData] = useState([
    { title: "test movie 1", image: badlandsImage, id: 12 },
    { title: "test movie 2", image: badlandsImage, id: 13 },
    { title: "test movie 2", image: badlandsImage, id: 14 },
    { title: "test movie 2", image: badlandsImage, id: 15 },
    { title: "test movie 2", image: badlandsImage, id: 16 },
    { title: "test movie 2", image: badlandsImage, id: 17 },
    { title: "test movie 2", image: badlandsImage, id: 18 },
    { title: "test movie 2", image: badlandsImage, id: 19 },
  ])

  const profile = { name: "John Doe", image: profileImage, id: 1234 }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/pages/Movie" element={<Movie />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
