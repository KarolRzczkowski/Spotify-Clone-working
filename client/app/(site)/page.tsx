'use client'
import Header from '../components/Header'
import React from 'react'
import Firstpage from '../components/Firstpage'
function Home() {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header/>
      <Firstpage />
    </div>
  );
}

export default Home