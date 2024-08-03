import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import MovieButton from './components/MovieButton';
import badlandsImage from './badlands.jpg';

function App() {
  const movieData = { title: "test movie", image: badlandsImage, id: 12 };
  return (
    <div className="App">
      <MovieButton movie={movieData} />
      <p>Is this working?</p>
    </div>
  );
}

export default App;