import React from "react";
import { useState } from "react";

const inputStyle = {
  backgroundColor: '#EDECEC',
};

function MovieButton({movie}) {
    // Movie object: 
    // movie.title 
    // movie.image 
  return (
    <>
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center">
        <div className="">
            <img class = "max-h-45" src= {movie.image}></img>
            <div class="text-xl font-medium text-right ">{movie.title}</div>
        </div>
    </div>
    </>
  );
};

export default MovieButton;