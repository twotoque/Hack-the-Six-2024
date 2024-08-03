import logo from './logo.svg';
import {useState} from 'react';
import './Home.css';
import MovieButton from '../components/MovieButton.jsx';
import ProfileButtonWhite from '../components/ProfileButtonWhite.jsx';
import profileImage from '../profileImage.png';
import ozBanner from '../ozbanner.png';
import scotiabankTheatre from '../scotiabank.png';
import TheatreBanner from '../components/Theatre.jsx'
function Movie() {

  const movie = {  title: "Wizard of Oz", banner: ozBanner, description: "The Wizard of Oz is a classic tale that follows a young girl named Dorothy who is swept away by a tornado to the magical land of Oz. To find her way back home to Kansas, she embarks on a journey to see the Wizard of Oz, accompanied by a scarecrow, a tin man, and a cowardly lion. Along the way, they confront various challenges and learn valuable lessons about courage, friendship, and self-discovery.", id: 11};
  const profile = { name: "John Doe", image: profileImage, id: 1234 };
  const [theatreData, setMovieData] = useState([{ name: "Scotiabank Theatre", image: scotiabankTheatre, address: "259 Richmond Street West",  id: 1 },
  { name: "TIFF Bell Lightbox", image: scotiabankTheatre, address: "350 King Street West",  id: 2 },
  { name: "Roy Thomson Hall", image: scotiabankTheatre, address: "60 Simcoe Street",  id: 3 },
  { name: "Princess of Wales Theatre", image: scotiabankTheatre, address: "300 King Street West",  id: 4 },
  { name: "Royal Alexandra Theatre", image: scotiabankTheatre, address: "260 King Street West",  id: 5 },
  { name: "Elgin and Winter Garden Theatre Centre", image: scotiabankTheatre, address: "189 Yonge Street",  id: 6 }]);

  const [shows, setShows] = useState([{ time: "7:30pm - 9:40pm", theatre: 2, id: 1029}, { time: "1:30am - 9:40pm", theatre: 2, id: 52}])
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
            {theatreData.map(theatre => (
              <div>
               <TheatreBanner key={theatre.id} theatre={theatre} show = {shows} />
              </div>
            ))}



    </div>
  );
}

export default Movie;