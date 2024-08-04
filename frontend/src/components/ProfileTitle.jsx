import React from "react";
import { Link } from "react-router-dom";
import backArrow from "../BackArrow.svg"


function ProfileButton({profile}) {
    // Profile object: 
    // profile.name 
    // profile.image 
  return (
    <>
      <div class="flex flex-row pr-max items-center">
        <Link to = "../">
            <img class = "w-20 h-20 mr-10" src= {backArrow}></img>
          </Link>
          <img class = "w-20 h-20 mr-3" src= {profile.image}></img>
          <div class="text-5xl font-bold text-right pl-3 ">{profile.name}</div>
      </div>
    </>
  );
};

export default ProfileButton;