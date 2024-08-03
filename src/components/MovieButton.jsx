import React from "react";
import { useState } from "react";
import Movie from '../pages/Movie.js';
import { Link} from 'react-router-dom';


const inputStyle = {
  backgroundColor: '#EDECEC',
};

function MovieButton({movie}) {
    // Movie object: 
    // movie.title 
    // movie.image 
  return (
    <>
    <Link to="/pages/Movie">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center justify-center">
          <div className="">
              <img class = "max-h-16" src= {movie.image}></img>
              <div class="text-xl font-medium text-center pt-3 ">{movie.title}</div>
          </div>
      </div>
    </Link>
    </>
  );
};

export default MovieButton;