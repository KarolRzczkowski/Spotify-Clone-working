'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import Image from 'next/image';

const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [artistID, setArtistID] = useState('');
  const [topTracks, setTopTracks] = useState([]);

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
          setArtistID(artistData.id);

          const tracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistData.id}/top-tracks?country=US`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (tracksResponse.status === 200) {
            const tracksData = tracksResponse.data.tracks;
            setTopTracks(tracksData);
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

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchMusic();
    }
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className='text-left w-full h-full bg-black'>
      <div className='w-[400px] h-[50px] justify-center'>
        <div className='relative'>
          <AiOutlineSearch size={25} className='absolute top-2/4 left-4 transform -translate-y-2/4 text-neutral-400' />
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
            <div key={index} className=' items-center justify-between'>
              <div className='rounded-full '>
              <img src={track.album.images[0].url} alt={track.name} className='w-130 h-30'  />
              </div>
              <p>{track.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
