import React from "react";
import { useState } from "react";

function MovieButton({movie}) {
  return (
    <>
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center">
        <div class="text-xl font-medium text-right">{movie.title}</div>
    </div>
    </>
  );
};

export default MovieButton;