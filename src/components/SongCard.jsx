import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';


const SongCard = ({song, i, data, isPlaying, activeSong}) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
  <div className="flex flex-col w-[200px] p-4 bg-[#00000051] bg-opacity-10 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div className='realative w-full h-35 group'>
      <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong.title === song.title ? 'flex bg-[#d4d4d41d] bg-opacity-70' : 'hidden'} `}>
        <PlayPause
          song = {song}
          isPlaying = {isPlaying}
          activeSong = {activeSong}
          handlePlay = {handlePlayClick}
          handlePause = {handlePauseClick}
        />
      </div>
      <img alt='song_img' src={song.images?.coverart} className='w-full h-full rounded-lg'></img>
    </div>

    <div className='mt-4 flex flex-col'>
      <p className='font-semibold text-lg text-white truncate'>
        <Link to= {`/songs/${song?.key}`} >{song.title}</Link>
      </p>

      <p className='text-sm truncate text-gray-300 mt-1'>
        <Link to={ song.artists ? `artists/${song?.artists[0]?.adamid}` : '/top-artist'}> {song.subtitle} </Link>
      </p>
    </div>
    
    </div>
)}

export default SongCard;
