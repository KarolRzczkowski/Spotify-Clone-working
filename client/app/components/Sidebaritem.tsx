import React from 'react';
import IconType from 'react-icons';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation'; // Zmieniamy import na next/router

interface SideBarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SideBarItemProps> = ({
  icon: Icon,
  label,
  active,
  onClick,
}) => {
  const router = useRouter(); // Inicjujemy router wewnątrz komponentu



  return (
    <div

      className={twMerge(`
        flex
        flex-row
        h-auto 
        items-center
        w-full
        gap-x-4
        text-md
        font-medium
        cursor-pointer
        hover:text-white
        transition
        text-neutral-400
        py-1
      `, active && "text-white")}
    >
      <Icon size={26} />
      <p className='truncate w-full'>{label}</p>
    </div>
  );
};

export default SidebarItem;
