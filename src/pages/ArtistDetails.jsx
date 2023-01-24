import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';
import { data } from 'autoprefixer';



const ArtistBio = ({bio}) => {
  const artistBio = bio.attributes.artistBio; 
  return (
    <div  className="flex flex-col">
      <div className="mt-4 w-full flex flex-col">
        <h2 className='text-white text-l text-justify ml-1 mr-2' dangerouslySetInnerHTML={{__html:artistBio}}></h2>
      </div>
    </div>
  )
};


const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery({artistId});

  if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col mb-8">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData.data[0]}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold ml-3">Artist Bio:</h2>
          <div className="mt-5 ml-3">
            {/* {Object.values(artistData.data[0]).map((bio) => ( */}
              <ArtistBio
                // key={bio.key}
                bio = {artistData.data[0]}
              ></ArtistBio>
            {/* ))} */}
          </div>
      </div>
      {/* <TopSongs
        data={artistData.data[0]}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      /> */}
    </div>
  );
};

export default ArtistDetails;