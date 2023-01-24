import React from "react";
import { useSelector } from "react-redux";
import {useGetTopChartsQuery } from "../redux/services/shazamCore"
import { Loader, Error, SongCard } from "../components";

const TopCharts = () => {

    const { data, isFetching, error } = useGetTopChartsQuery();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    if(isFetching)  return <Loader title={'Searching Top Charts...'} />
    if(error)   return <Error/>

    return (
    
    <div className="flex flex-col mb-8">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>
        <div className="flex flex-wrap sm:justify-around justify-around  gap-8">
            {data.map((song, i) => (
                <SongCard
                    key={song.key}
                    song={song}
                    i = {i}
                    data={data}
                    isPlaying= {isPlaying}
                    activeSong= {activeSong}
                />
            ))}
        </div>
    </div>

)};

export default TopCharts;
