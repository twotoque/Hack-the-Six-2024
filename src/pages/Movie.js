import logo from './logo.svg';
import {useState} from 'react';
import './Home.css';
import MovieButton from '../components/MovieButton.jsx';
import ProfileButton from '../components/ProfileButton.jsx';
import profileImage from '../profileImage.png';
import ozBanner from '../ozbanner.png';

function Movie() {

  const movie = {  title: "Wizard of Oz", banner: ozBanner, id: 11};
  const profile = { name: "John Doe", image: profileImage, id: 1234 };
  
  return (
    <div>
    <img  style={{ margin: 0, padding: 0 }} class = "absolute w-full z-[-1]" src = {movie.banner}/>
        <div class="  textpadding flex flex-row items-start justify-between">
          <h1 className="text-7xl text-white font-bold text-left">{movie.title}</h1>
        <ProfileButton key={profile.id} profile={profile} />
        </div>
    </div>
  );
}

export default Movie;