
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function ShowButton({shows, theatre}) {

    const showData = find(time => time.theatre === theatre.id);
    return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center justify-center">
        <div className="">
            <div class="text-xl font-medium text-center pt-3 ">{show.time}</div>
        </div>
    </div>
    );
}
export default ShowButton;