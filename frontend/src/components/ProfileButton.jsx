import React from "react";


function ProfileButton({profile}) {
    // Profile object: 
    // profile.name 
    // profile.image 
  return (
    <>
        <div class="flex items-center">
            <img class = "max-h-12" src= {profile.image}></img>
            <div class="text-xl font-medium text-right pl-3 ">{profile.name}</div>
        </div>
    </>
  );
};

export default ProfileButton;