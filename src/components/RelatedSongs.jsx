import SongBar from "./SongBar";
import React from "react";

const RelatedSongs = ({data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => {

  return (
    <div  className="flex flex-col">
      <h1 className="text-white font-bold text-2xl">Realated Songs</h1>
      <div className="mt-6 w-full flex flex-col">
        {Object.values(data).map((song,i)=> (
          <SongBar
            key={`${artistId}-${song.key}-${i}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            />
        ))}
      </div>
    </div>
    
  )
};

export default RelatedSongs;
