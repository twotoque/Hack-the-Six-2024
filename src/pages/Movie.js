import logo from './logo.svg';
import './Movie.css';
import {useState} from 'react';
import MovieButton from '../components/MovieButton.jsx';
import ProfileButton from '../components/ProfileButton.jsx';
import badlandsImage from '../badlands.jpg';
import profileImage from '../profileImage.png';

function Movie() {

  const profile = { name: "John Doe", image: profileImage, id: 1234 };
  
  return (
    <div className="App">
        <div class="flex flex-row items-start justify-between">
          <h1 className="text-7xl font-bold text-left">MOVIE PAGE</h1>
        <ProfileButton key={profile.id} profile={profile} />
        </div>
    </div>
  );
}

export default Movie;