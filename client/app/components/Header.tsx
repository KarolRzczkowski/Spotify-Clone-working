'use client'
import React from 'react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Modal from './Modal';
interface HeaderProps {
  children: React.ReactNode;
  isLoggedin?: boolean;
}

const Header: React.FC<HeaderProps> = ({ children, isLoggedin }) => {
  const router = useRouter();

  return (

        <div className="bg-gradient-to-b from-emerald-800 p-10">
          <div className="w-full flex justify-between items-center cursor-pointer">
            <div className="flex items-center translate-y-[-10px]">
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
            {children}
          </div>
          
        </div>
  
  );
};



export default Header;
