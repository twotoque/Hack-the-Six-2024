
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function TheatreBanner({theatre, shows}) {
    const [showContent, setShowContent] = useState(false);

    const handleClick = () => {
        setShowContent(true);
    };
    
  return (

    <Link to="#" onClick={handleClick}>

    <div class=" relative text-white">
    <img  style={{ margin: 0, padding: 0 }} class = "absolute w-full z-[-1] " src = {theatre.image}/>
        <div class="text-left theatrepadding pt-10 pb-10 ">
            <h2 class="text-3xl font-bold">{theatre.name}</h2>
            <p>{theatre.address}</p>
        </div>

    {showContent && (
        <div class ="theatrepadding align-left">
          <h1>inser lit of shows</h1>
        </div>
      )}
    </div>
    </Link>
  );

}

export default TheatreBanner;