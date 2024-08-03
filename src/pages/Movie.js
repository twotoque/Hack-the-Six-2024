import logo from './logo.svg';
import './Home.css';
import {useState} from 'react';
import MovieButton from '../components/MovieButton.jsx';
import ProfileButton from '../components/ProfileButton.jsx';
import badlandsImage from '../badlands.jpg';
import profileImage from '../profileImage.png';

function Movie() {

  
  const [movieData, setMovieData] = useState([
    { title: "test movie 1", image: badlandsImage, id: 12 },
    { title: "test movie 2", image: badlandsImage, id: 13 },
    { title: "test movie 2", image: badlandsImage, id: 14 },
    { title: "test movie 2", image: badlandsImage, id: 15 },
    { title: "test movie 2", image: badlandsImage, id: 16 },
    { title: "test movie 2", image: badlandsImage, id: 17 },
    { title: "test movie 2", image: badlandsImage, id: 18 },
    { title: "test movie 2", image: badlandsImage, id: 19 }
  ]);

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