import React from "react";
import { Loader,Error, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";


const TopArtists = () => {
    const {data, isFetching, error} = useGetTopChartsQuery();

    if(isFetching)  return <Loader title="Loading Top Artists" />
    if(error)   return <Error />

    return (
    <div className="flex flex-col mb-8">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Artists</h2>
        <div className="flex flex-wrap sm:justify-around justify-around  gap-8">
            {data?.map((track) => (
                <ArtistCard
                    key={track.key}
                    track={track}
                />
            ))}
        </div>
    </div>

    )
}

export default TopArtists;
