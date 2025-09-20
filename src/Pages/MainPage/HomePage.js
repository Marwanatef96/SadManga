/** @format */

import React from "react";
import PopularManga from "./Popular/PopularManga";
import LatestManga from "./latest/LatestManga";
import { Profiler } from "react";
const HomePage = () => {
    return (
        <>
            <PopularManga />
            <LatestManga />
        </>
    );
};

export default HomePage;
