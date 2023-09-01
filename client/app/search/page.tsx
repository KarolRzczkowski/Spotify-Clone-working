'use client';
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';

const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
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

  return (
    <div className='text-left w-full h-full bg-black'>
      <div className='w-[400px] h-[50px] justify-center'>
        <div className='relative'>
          <AiOutlineSearch size={25} className='absolute top-2/4 left-4 transform -translate-y-2/4 text-neutral-400' />
          <input
            className='pl-[40px] rounded-full bg-neutral-800 w-[400px] h-[50px]'
            type='search'
            placeholder='What do you want to listen?'
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
