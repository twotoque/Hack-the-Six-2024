import logo from "./logo.svg"
import { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MovieButton from "./components/MovieList/MovieButton.jsx"
import ProfileButton from "./components/ProfileButton.jsx"
import badlandsImage from "./badlands.jpg"
import profileImage from "./profileImage.png"
import Home from "./pages/Home/Home.js"
import Movie from "./pages/Movie/Movie.js"
import Layout from "./components/layout/Layout.jsx"

import axios from "axios"
axios.defaults.baseURL = "http://localhost:3001"

function App() {
  const profile = { name: "John Doe", image: profileImage, id: 1234 }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/event/:slug" element={<Movie />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
