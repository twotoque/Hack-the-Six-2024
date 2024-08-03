import React from "react";


function ProfileButton({profile}) {
    // Profile object: 
    // profile.name 
    // profile.image 
  return (
    <>
        <img class = "max-h-16" src= {profile.image}></img>
        <div class="text-xl font-medium text-right ">{profile.name}</div>
    </>
  );
};

export default ProfileButton;