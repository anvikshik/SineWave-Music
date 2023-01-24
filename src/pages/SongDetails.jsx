import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Loader, Error, RelatedSongs } from "../components";

import { useGetSongDetailsQuery, useGetRealtedSongQuery } from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

const SongDetails = () => {
    const dispatch = useDispatch();
    const {songid, artistId:artistId} = useParams();

    const {activeSong, isPlaying} = useSelector(state => state.player)

    const {data, isFetching:isFetchingSongDetails, error} = useGetSongDetailsQuery({songid});
    const {data:relatedSongData, isFetching:isFetchingRealatedSongDetails} = useGetRealtedSongQuery({ songid });
    
    if(isFetchingSongDetails && isFetchingRealatedSongDetails)  return <Loader title=""/>
    if(error)       return <Error/>


    const handlePauseClick = () => {
        dispatch(playPause(false));
    };
    
      const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    return (
        <div  className="flex flex-col mb-8">
            <DetailsHeader artistId ="" songData = {data}/>

            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold ml-3">Lyrics:</h2>

                <div className="mt-5 ml-3">
                    {data?.sections[1].type === "LYRICS" ? (
                        data?.sections[1].text.map( (line, index) =>
                        (
                            <p className="text-gray-300 text-base my-1">{line}</p>
                        ))
                    ):(
                        <p className="text-gray-300 text-base my-1">SORRY NO LYRICS FOUND!</p>
                    )}
                </div>
            </div>

            <RelatedSongs
                data={relatedSongData}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            ></RelatedSongs>
        </div>
    )
}

export default SongDetails;
