import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import MovieButton from './components/MovieButton';
import badlandsImage from './badlands.jpg';

function App() {

  
  const [movieData, setMovieData] = useState([
    { title: "test movie 1", image: badlandsImage, id: 12 },
    { title: "test movie 2", image: badlandsImage, id: 13 },
    { title: "test movie 2", image: badlandsImage, id: 14 },
    { title: "test movie 2", image: badlandsImage, id: 15 }
  ]);
  return (
    <div className="App">
        <h1>Tiff-Tok</h1>
        <div class="flex">
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