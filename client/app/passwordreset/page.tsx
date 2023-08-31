'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

 function Page() {
  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [codeInputs, setCodeInputs] = useState(['', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState(0);
  const [enteredCode, setEnteredCode] = useState('');
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

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

  const generateRandomCode = () => {
    return Math.floor(Math.random() * 9000) + 1000;
  };

  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const exists = await checkUserExists(newEmail);
    setUserExists(exists);

    if (exists) {
      const randomCode = generateRandomCode();
      setGeneratedCode(randomCode);
      setIsCodeCorrect(false);
      setCodeInputs(['', '', '', '']);
      setEnteredCode('');
    }
  };

  const handleCodeInputChange = (index, value) => {
    if (isAllDigits(value) || value === '') {
      const newCodeInputs = [...codeInputs];
      newCodeInputs[index] = value;
      setCodeInputs(newCodeInputs);
      setEnteredCode(newCodeInputs.join(''));

      if (value.length === 1 && index < codeInputs.length - 1) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }

      if (newCodeInputs.join('') === generatedCode.toString()) {
        setIsCodeCorrect(true);
        console.log('Correct code!');
      } else {
        setIsCodeCorrect(false);
        console.log('Incorrect code!');
      }
    }
  };

  const isAllDigits = (input) => /^\d+$/.test(input);

  const handleCodeInputBlur = (index) => {
    if (!isAllDigits(codeInputs[index]) && codeInputs[index] !== '') {
      alert('Please enter a valid digit.');
    }
  };

  useEffect(() => {
    if (userExists) {
      const randomCode = generateRandomCode();
      setGeneratedCode(randomCode);
      setIsCodeCorrect(false);
      setCodeInputs(['', '', '', '']);
      setEnteredCode('');
    }
  }, [userExists]);

  return (
    <main className='bg-black w-full h-full flex justify-center items-center'>
      <div className='text-center pr-[80px]'>
        {userExists ? (
          <div className='w-[500px] bg-black-900 h-[200px] justify-center'>
            {isCodeCorrect ? (
            <div className='w-[300px] h-[200px] bg-black  justify-center'>
              <div className='justify-center'>
            <input  className='w-[200px] h-[30px] bg-black' type='password' placeholder='Enter lastest password'/>
            </div>
            <div>
            <input className='w-[200px] h-[20px] bg-black' type='password' placeholder='Enter new password'/>
</div>
            </div>
            ) : (
              <React.Fragment>
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
              
                <p className='pt-[20px]'>{generatedCode}</p>
              </React.Fragment>
            )}
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
              <div className='text-red-500'>User does not exist in the database</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
            }
export default Page