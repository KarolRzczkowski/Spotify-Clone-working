'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import github from './images/github.svg';
import google from './images/google.svg';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleprovider, githubprovider } from '../config/firebaseconfig';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import spotify from './images/spotify-icon.svg'
import { useRouter } from 'next/navigation';
import ForgottenPassword from '../password/ForgottenPassword';
import Link from 'next/link';
import password from '../password/ForgottenPassword';
interface FirstPageProps {
  isLoggedin?: boolean;
}

const Firstpage: React.FC<FirstPageProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isloggedin, setIsloggedin] = useState<boolean>(false);
  const [isgithubloggedin, setIsGithubLoggedin] = useState<boolean>(false);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

   //creating usememo navigation
   const router   = useRouter()
   const pathname = usePathname()

  const handlegoogleclick = () => {
    signInWithPopup(auth, googleprovider)
      .then((data) => {
        if (data.user.email) {
          setEmail(data.user.email);
          localStorage.setItem('email', data.user.email);
          setIsloggedin(true);
          setShowLoginForm(false);
        }
      })
      .catch((error) => {
        console.log('Google login error:', error);
      });
  };

  const handlegitclick = () => {
    signInWithPopup(auth, githubprovider)
      .then((data) => {
        if (data.user.email) {
          setEmail(data.user.email);
          localStorage.setItem('email', data.user.email);
          setIsloggedin(true);
          setIsGithubLoggedin(true);
          setShowLoginForm(false);
        }
      })
      .catch((error) => {
        console.log('GitHub login error', error);
      });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(newPassword.length < 10);
  };

  const handleAddPassword = async () => {
    try {
      await axios.post('/passwords', { password });
      setPassword('');
      setPasswordError(false);
      console.log('Your password is already in the database');
    } catch (error) {
      console.log('Error adding password:', error);
    }
  };

  const handleaddemail = async () => {
    try {
      await axios.post('/emails', { email });
      setEmail('');
      console.log('Your email is already in the database');
    } catch (error) {
      console.log('Error adding email:', error);
    }
  };

  const handleLogin = async () => {
    try {
      if (email.length === 0 || password.length === 0) {
        console.log('Email and password cannot be empty');
        return;
      }
  
      const response = await axios.post('/auth', { email, password });
      if (response.status === 200) {
        console.log('Login successful');
        setIsloggedin(true);
        setIsGithubLoggedin(true);
        setShowLoginForm(false);
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };
  

  const handlereload = () => {
    window.location.reload();
    localStorage.removeItem('email');
    setIsGithubLoggedin(false);
    setShowLoginForm(true);
  };
  return (
    <div className={`h-screen p-6 flex justify-center items-center static pr-[290px] pb-40 ${isloggedin ? '' : 'blur-background'}`}>
      <div className="fixed right-10 top-2">
        {!isloggedin ? (
          <div className="w-20 h-[45px] bg-white rounded-md shadow-lg flex items-center justify-center translate-x-[-20px] top-[20px] translate-y-[20px]">
            <div
              className="text-neutral-800 cursor-pointer"
              onClick={() => setShowLoginForm(true )}
               
            >
              Sign in
            </div>
          </div>
        ) : null}
        {isloggedin ? (
          <div className="w-20 h-[45px] bg-white rounded-md shadow-lg flex items-center justify-center translate-x-[-20px] top-[20px] translate-y-[20px]">
            <div className="text-neutral-800 cursor-pointer">
              Logged In
            </div>
          </div>
        ) : null}
        <div className='fixed top-2 right-10'>
          {isloggedin ? (
            <div className='w-20 h-[50px] bg-neutral-800 rounded-md shadow-lg flex items-center justify-center translate-x-[-150px] translate-y-[20px] '>
              <button className='text-white cursor-pointer' onClick={handlereload} >Log Out</button>
            </div>
          ) : null}
        </div>
      </div>
  
      {isloggedin ? (
        <div className="w-[100px] h-[50px] translate-x-[-630px] text-center z-20 pb-[900px] flex items-center welcome-section">
          <p className="text-4xl text-white-900 text-left">Welcome!</p>
        </div>
      ) : (
        <div className="flex w-[100px] h-[50px] translate-x-[-630px] pr-9 text-center pb-[900px] z-10 items-center blur-md">
          <p className="text-4xl text-white-900 text-left filter blur-md r-200">Welcome!</p>
        </div>
      )}
  
      <div className="fixed right-10 top-2">
        {isloggedin ? (
          <div className="w-20 h-[45px] bg-white rounded-md shadow-lg flex items-center justify-center translate-x-[-20px] top-[20px] translate-y-[20px]">
            <div className="text-neutral-800 cursor-pointer">
              Logged In
            </div>
          </div>
        ) : null}
        <div className='fixed top-2 right-10'>
          {isloggedin ? (
            <div className='w-20 h-[50px] bg-neutral-800 rounded-md shadow-lg flex items-center justify-center translate-x-[-150px] translate-y-[20px] '>
              <button className='text-white cursor-pointer' onClick={handlereload}>Log Out</button>
            </div>
          ) : null}
        </div>
      </div>
      {showLoginForm ? (
        <div className={`max-w-md w-full p-10 bg-neutral-800 rounded-md shadow-lg ${showLoginForm ? 'blur-content' : ''}`}>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl mt-[20px] font-semibold mb-20 text-center flex justify-center">
               <Image className=' translate-y-[-2px] translate-x-[-10px] '  src={spotify} width={40} height={40} alt="" />
               Login to Spotify</h2>
            <div className="flex gap-4 items-center bg-neutral-800 p-2 rounded-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="flex-1 px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleaddemail}
                className="flex items-center justify-center px-10 mx-2 h-15 bg-neutral-800 text-white rounded-md hover:bg-green-800 focus:outline-none"
              >
                Add Email
              </button>
            </div>
            <div className="flex gap-4 items-center bg-neutral-800 p-2 rounded-md">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className={`px-6 py-2 bg-neutral-800 text-white rounded-md focus:outline-none transition ${passwordError ? 'border-red-500' : ''}`}
              />
              <button
                onClick={handleAddPassword}
                className="px-6 py-2 h-15 bg-neutral-800 text-white rounded-md hover:bg-green-800 focus:outline-none transition"
              >
                Add Password
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500">Password must be at least 10 characters long.</p>
            )}
            <div className="flex justify-center mt-6 space-x-4">
              {!isgithubloggedin ? (
                <div className="bg-neutral-800 p-2 rounded-md flex items-center">
                  <Image src={github} width={30} height={30} alt="" />
                  <button className="text-white hover:text-gray-300 ml-2" onClick={handlegitclick}>
                    GitHub
                  </button>
                </div>
              ) : null}
              <div className="bg-neutral-800 p-2 rounded-md flex items-center">
                <Image src={google} width={30} height={30} alt="" />
                <button onClick={handlegoogleclick} className="text-white hover:text-gray-300 ml-2">
                  Google
                </button>
              </div>
            </div>
            <div className='flex items-center justify-center cursor-pointer hover:underline'>
            <button onClick={() => router.push('/passwordreset' , {scroll:false})}>Forgotten Password?</button>
</div>

            <button
              onClick={handleLogin}
              className="mt-5  px-4 py-2 bg-neutral-800 text-white rounded-md focus:outline-none transition border"
            >
              Login
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
              }

export default Firstpage;