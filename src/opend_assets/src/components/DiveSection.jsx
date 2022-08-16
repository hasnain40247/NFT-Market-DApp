import React, { useEffect } from "react";
import { LoadStars } from "./LoadStars";

const DiveSection = () => {

    useEffect(() => {
        LoadStars()


    }, [])
    return (
        <div className="divesection">

            <canvas id="stars" />

        </div>
    );
};

export default DiveSection;
