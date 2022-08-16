import React, { useEffect } from "react";
import { LoadStarsMint } from "./LoadStars";

const MintBackDrop = () => {

    useEffect(() => {
        LoadStarsMint()


    }, [])
    return (
        <div className="mintsection">

            <canvas id="mintstars" />


        </div>
    );
};

export default MintBackDrop;
