// Firstpage.tsx
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import github from './images/github.svg';
import google from './images/google.svg';
import Image from 'next/image';

const Firstpage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleAddUser = async () => {
    try {
      await axios.post('/emails', { email });
      setEmail('');
    } catch (error) {
      console.log('Error adding', error);
    }
  };

  const handleAddPassword = async () => {
    try {
      await axios.post('/passwords', { password });
      setPassword('');
      setPasswordError(false);
    } catch (error) {
      console.log("Error fetching password", error);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 10) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleLogin = async () => {
    try {
      // Implement your login logic here
      console.log("Login logic here");
    } catch (error) {
      console.log("Error during login", error);
    }
  };

  return (
    <div className={twMerge(`
        h-screen
        p-6
        flex
        justify-center
        items-center
      `)}
      style={{ backdropFilter: 'blur(4px)' }}
    >
      <div className={twMerge(`
        max-w-md
        w-full
        p-10
        bg-neutral-800
        rounded-md
        shadow-lg
      `)}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-20 text-center">Add user to database</h2>
          <div className="flex gap-4 items-center bg-neutral-800 p-2 rounded-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="flex-1 px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAddUser}
              className="flex items-center justify-center px-10 mx-2 h-10 bg-neutral-800 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Add User
            </button>
          </div>
          <div className="flex gap-4 items-center bg-neutral-800 p-2 rounded-md">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="px-6 py-2 bg-neutral-800 text-white rounded-md focus:outline-none transition"
            />
            <button
              onClick={handleAddPassword}
              className="px-6 py-2 bg-neutral-800 text-white rounded-md hover:bg-green-600 focus:outline-none transition"
            >
              Add Password
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500">Password must be at least 10 characters long.</p>
          )}
          <div className="flex justify-center mt-6">
            <div className="bg-neutral-800 p-2 rounded-md flex items-center mx-1">
              <Image src={github} width={30} height={30} alt="" />
              <button className="text-white hover:text-gray-300 ml-2">GitHub</button>
            </div>
            <div className="bg-neutral-800 p-2 rounded-md flex items-center mx-1">
              <Image src={google} width={30} height={30} alt="" />
              <button className="text-white hover:text-gray-300 ml-2">Google</button>
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="mt-10 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Firstpage;
