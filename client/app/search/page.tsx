'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiFillPlayCircle } from 'react-icons/ai';
import axios from 'axios';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [topTracks, setTopTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  //router statement
  
  const router = useRouter()

   
  // Access tokens
  const CLIENT_ID = '7d408fc77ae8499f82bcbef4bce9be2c';
  const CLIENT_SECRET = 'e7c7b60e02e1400ea4f35b0d3c195c91';

  useEffect(() => {
    const fetchAccessToken = async () => {
      const authParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      };

      try {
        const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.access_token);
          console.log('Access Token:', data.access_token);
        } else {
          console.error('Error fetching access token:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  // Search the music
  const searchMusic = async () => {
    console.log('Search query:', searchInput);

    try {
      const artistResponse = await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (artistResponse.status === 200) {
        const artistData = artistResponse.data.artists.items[0];
        if (artistData) {
          const tracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistData.id}/top-tracks?country=US`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (tracksResponse.status === 200) {
            const tracksData = tracksResponse.data.tracks;
            setTopTracks(tracksData);
            setCurrentTrackIndex(-1);
            if (audioElement) {
              audioElement.pause();
            }
          } else {
            console.error('Error fetching top tracks:', tracksResponse.statusText);
          }
        } else {
          console.error('Artist not found');
        }
      } else {
        console.error('Error fetching artist:', artistResponse.statusText);
      }
    } catch (error) {
      console.error('Error searching music:', error);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchMusic();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handlePlayMusic = (previewUrl: string, index: number) => {
    if (audioElement) {
      audioElement.pause();
    }

    if (currentTrackIndex !== index) {
      const newAudioElement = new Audio(previewUrl);
      newAudioElement.play();
      setAudioElement(newAudioElement);
      setCurrentTrackIndex(index);

window.onbeforeunload = () =>{
  return 'Do you want to exit the page and stop play music?'
}

    } else {
      setCurrentTrackIndex(-1);
      window.onbeforeunload = null
    }
  };

  return (
    <div className='text-left w-full h-full bg-neutral-900'>
      <div className='w-[400px] h-[50px] justify-center'>
        
        <div className='relative flex justify-between    w-[550px] translate-y-[15px]'>
        <div className="flex items-center pl-[10px]">
              <button onClick={() => router.back()} className="text-white rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                <RxCaretLeft size={35} />
              </button>
              <div className="flex items-center ml-4  ">
                {/* Twój kod */}
              </div>
              <button onClick={() => router.forward()} className="text-white rounded-full bg-black flex items-center justify-center hover:opacity-75 transition ml-2">
                <RxCaretRight size={35} />
              </button>
              <div className="flex items-center ml-2">
                 
              </div>
            
            </div>
          <AiOutlineSearch size={25} className='absolute top-2/4 left-[160px] transform -translate-y-2/4 text-neutral-400' />
          
          <input
            className='pl-[40px] rounded-full bg-neutral-800 w-[400px] h-[50px]'
            type='input'
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            value={searchInput}
            placeholder='What do you want to listen?'
          />
        </div>
        <div className='flex cursor-pointer justify-center '>
          {topTracks.map((track, index) => (
            <div
              key={index}
              className='items-center justify-between cursor-pointer p-4 border-b border-neutral-700'
              onClick={() => handlePlayMusic(track.preview_url, index)}
            >
              <div className='rounded-full overflow-hidden w-16 h-16'>
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className='w-full h-full'
                />
              </div>
              <div className='ml-4'>
                <p className='text-white font-semibold'>{track.name}</p>
                <p className='text-neutral-400 text-sm'>{track.artists[0].name}</p>
              </div>
              <div>
                {currentTrackIndex === index ? (
                  audioElement && !audioElement.paused ? (
                    <AiFillPlayCircle size={30} className='text-green-500' />
                  ) : (
                    <AiFillPlayCircle size={30} className='text-white' />
                  )
                ) : (
                  <AiFillPlayCircle size={30} className='text-white' />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
