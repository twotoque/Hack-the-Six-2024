
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function ShowButton({shows, theatre}) {

    console.log(shows);
    console.log(theatre);
    const showPointer = shows.find(shows => shows.theatre === theatre.id);
    console.log(showPointer)

    return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center justify-center">
        <div className="">
        </div>
    </div>
    );
}
export default ShowButton;