import React from "react";
import { Link } from "react-router-dom";


function ProfileButton({profile}) {
    // Profile object: 
    // profile.name 
    // profile.image 
  return (
    <>
      <div class="flex items-center">
          <img class = "w-24 h-24 " src= {profile.image}></img>
          <div class="text-5xl font-bold text-right pl-3 ">{profile.name}</div>
      </div>
    </>
  );
};

export default ProfileButton;