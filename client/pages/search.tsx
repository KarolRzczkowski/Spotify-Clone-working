import React from 'react';
import SearchComponent from '@/app/components/SearchComponent';

const Search: React.FC = () => {
  const userPermissions = {
    search: true,
  };

  return (
    <div className='w-full h-full bg-neutral-800'>
      <div>
        <SearchComponent  />
      </div>
    </div>
  );
};

export default Search;
