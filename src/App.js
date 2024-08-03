import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import MovieButton from './components/MovieButton.jsx';
import ProfileButton from './components/ProfileButton.jsx';
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
        <div class="flex flex-row items-start justify-between">
          <h1 className="text-7xl font-bold text-left">Tiff-Tok</h1>
        <ProfileButton key={profile.id} profile={profile} />
        </div>
        <h3 className="text-3xl text-left pt-4">An easy way to RSVP and view movie times</h3>
        
        
        <form class="max-w-md mx-auto ml-0 mt-3 mb-3">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 ps-10 border-white text-sm text-gray-900 border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 " placeholder="What are you feeling?" required />
                <button type="submit" class="absolute end-2.5 bottom-2.5 bg-background-orange focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>

        
        <div class="flex space-x-4">
          {movieData.map(movie => (
            <div>
            <MovieButton key={movie.id} movie={movie} />
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;