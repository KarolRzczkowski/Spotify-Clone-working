import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

const Library = () => {
  const [arrowRotated, setArrowRotated] = useState(false);

  const onClick = () => {
    // handle upload later
  };

  const handlearrow = () => {
    setArrowRotated(!arrowRotated);
  };

  return (
    <div className={`flex flex-col ${arrowRotated ? 'w-1/2' : 'w-full'}`}>
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={20} />
          <p className="read-only text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition-all"
        />
    
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3 text-center md:target:text-left">
        List of songs 
      </div>
    </div>
  );
};

export default Library;
