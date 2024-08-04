import React from "react";
import { Link } from "react-router-dom";


function TheatreShow({show}) {
    return (
      <>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col text-left items-left">
          <div class="text-xl font-medium ">{show.title}</div>
          <h2>{show.startTime}</h2>
      </div>
      </>
    );
  };

export default TheatreShow;