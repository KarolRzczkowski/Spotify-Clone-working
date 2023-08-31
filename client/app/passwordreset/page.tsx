'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page() {
  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [codeInputs, setCodeInputs] = useState(['', '', '', '']);
  const [randomCode, setRandomCode] = useState('');

  const checkUserExists = async (emailToCheck) => {
    try {
      const response = await axios.post('/existsemail', {
        email: emailToCheck,
      });

      return response.data === 'Email Exists';
    } catch (error) {
      console.log('Error checking user: ', error);
      return false;
    }
  };

  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const exists = await checkUserExists(newEmail);
    setUserExists(exists);

    // Resetuj pola kodu przy zmianie emaila
    setCodeInputs(['', '', '', '']);
  };

  const handleCodeInputChange = (index, value) => {
    if (isAllDigits(value) || value === '') {
      const newCodeInputs = [...codeInputs];
      newCodeInputs[index] = value;
      setCodeInputs(newCodeInputs);

      // Jeśli wprowadzono 1 cyfrę, przejdź do następnego pola
      if (value.length === 1 && index < codeInputs.length - 1) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
  
    }
  };


   
  const isAllDigits = (input) => /^\d+$/.test(input);

  const handleCodeInputBlur = (index) => {
    if (!isAllDigits(codeInputs[index]) && codeInputs[index] !== '') {
      alert('Please enter a valid digit.');
    }
  };

  const handleCodeSubmit = () => {
    const code = codeInputs.join('');
    // Wyślij kod do serwera lub przetwórz go dalej
    console.log('Submitted code:', code);
  };

  useEffect(() => {
    const generateRandomCode = () => {
      return Math.floor(Math.random() * 9000) + 1000;
    };

    const randomCode = generateRandomCode();
    setRandomCode(randomCode);
  }, []);


  return (
    <main className='bg-black w-full h-full flex justify-center items-center'>
      <div className='text-center pr-[80px]'>
        {userExists ? (
          <div className='w-[500px] bg-black-900 h-[200px] border justify-center'>
            <p className='text-white text-xl mb-2'>Enter the verification code</p>
            <div className='flex space-x-4 justify-center text-center'>
              {codeInputs.map((input, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  value={input}
                  className='w-[40px] h-[40px] bg-black border rounded text-center text-white'
                  type='text'
                  maxLength='1'
                  onChange={(e) => handleCodeInputChange(index, e.target.value)}
                  onBlur={() => handleCodeInputBlur(index)}
                />
              ))}
            </div>
            <button
              className='mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded'
              onClick={handleCodeSubmit}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className='w-[400px] h-[200px] bg-black rounded-lg p-6 pr-[50px]'>
            <p className='mb-4 text-white text-2xl text-center justify-center translate-y-[-20px]'>Enter your Email</p>
            <input
              className={`w-full px-3 py-2 rounded-md bg-neutral-900 text-white placeholder-gray-500 focus:outline-none ${
                userExists ? 'border border-green-500' : 'border border-red-500'
              }`}
              type='email'
              value={email}
              onChange={handleEmailChange}
              placeholder='Enter email'
            />
            {userExists ? (
              <div className='text-green-500 mt-2'>User exists in the database.</div>
            ) : (
             <div className='text-red-500 mt-2'>User not exist in the database</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
