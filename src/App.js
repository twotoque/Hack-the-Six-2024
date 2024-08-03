import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import MovieButton from './components/MovieButton';
import ProfileButton from './components/ProfileButton';
import badlandsImage from './badlands.jpg';
import profileImage from './profileImage.png';

function App() {

  
  const [movieData, setMovieData] = useState([
    { title: "test movie 1", image: badlandsImage, id: 12 },
    { title: "test movie 2", image: badlandsImage, id: 13 },
    { title: "test movie 2", image: badlandsImage, id: 14 },
    { title: "test movie 2", image: badlandsImage, id: 15 }
  ]);

  const profile = { name: "John Doe", image: profileImage, id: 1234 };
  
  return (
    <div className="App">
        <div class="flex flex-row items-start">
          <h1 className="text-7xl font-bold text-left">Tiff-Tok</h1>
        <ProfileButton key={profile.id} profile={profile} />
        </div>
        <h3 className="text-3xl text-left pt-4">An easy way to RSVP and view movie times</h3>
        
        <div class="flex space-x-4">
          {movieData.map(movie => (
            <div>
            <MovieButton key={movie.id} movie={movie} />
            </div>
          ))}
        </div>
      <p>Is this working?</p>
    </div>
  );
}

export default App;