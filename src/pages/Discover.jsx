import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { selectGenreListId } from '../redux/features/playerSlice';
import { data } from "autoprefixer";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";



const Discover = () => {

    const dispatch = useDispatch();
    const {activeSong, isPlaying} = useSelector((state) => state.player );
    const { genreListId } = useSelector((state) => state.player);

    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

    if(isFetching)  return <Loader title=""/>
    if(error)       return <Error/>

    var genreTitle = genres.find(({ value }) => value === genreListId)?.title;
    if(genreTitle === '' || genreTitle === undefined){  genreTitle = 'Pop';}
    
    return(
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col">
                <h2 className="font-bold text-3xl text-white text-left mb-8">Discover {genreTitle} </h2>
                <select
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                    value={genreListId || 'pop'}
                    className="bg-black  text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
                        {genres.map((genre) => <option key={genre.value} value={genre.value} >{genre.title}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-around justify-around mb-8 gap-8">
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
            
     )

}


export default Discover;
