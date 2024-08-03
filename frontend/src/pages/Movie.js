import logo from './logo.svg';
import {useState} from 'react';
import './Home.css';
import MovieButton from '../components/MovieButton.jsx';
import ProfileButtonWhite from '../components/ProfileButtonWhite.jsx';
import profileImage from '../profileImage.png';
import ozBanner from '../ozbanner.png';

function Movie() {

  const movie = {  title: "Wizard of Oz", banner: ozBanner, description: "The Wizard of Oz is a classic tale that follows a young girl named Dorothy who is swept away by a tornado to the magical land of Oz. To find her way back home to Kansas, she embarks on a journey to see the Wizard of Oz, accompanied by a scarecrow, a tin man, and a cowardly lion. Along the way, they confront various challenges and learn valuable lessons about courage, friendship, and self-discovery.", id: 11};
  const profile = { name: "John Doe", image: profileImage, id: 1234 };
  
  return (
    <div>
    <div className="relative ">
        <img  style={{ margin: 0, padding: 0 }} class = "absolute w-full z-[-1]" src = {movie.banner}/>
                 
                <div class="textpadding">
                <div class=" flex flex-row items-start justify-end"> 
                    <ProfileButtonWhite styles ="text-white" key={profile.id} profile={profile} />
                 </div>
                 <div class="pt-24">
                    <div class=" flex flex-row items-start justify-between">
                        <h1 className="text-7xl text-white font-bold text-left">{movie.title}</h1>
                </div>
                </div>
                </div>
            </div>
        
        <div class="textpadding">
            <h2 class="text-left">{movie.description}</h2>
            <div class="flex text-left pt-10 gap-2">

               <h2 class="text-3xl ">Coming dates for  </h2>
               <h2 class="text-3xl font-bold "> <button>Select date</button> </h2>


            </div>
            </div>



    </div>
  );
}

export default Movie;