'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Page() {
  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [passwordExists, setPasswordExists] = useState(false);
  const [codeInputs, setCodeInputs] = useState(['', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState(0);
  const [enteredCode, setEnteredCode] = useState('');
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isSamePassword, setIsSamePassword] = useState(true);

  const router = useRouter();

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

      const checkPasswordExists = async () => {
        try {
          const response = await axios.post('/auth', {
            email: newEmail,
            password: oldPassword,
          });

          setPasswordExists(response.data === 'Authentication successful');
        } catch (error) {
          console.log('Error in checking password', error);
        }
      };

      checkPasswordExists();
    }
  };

  const handleCodeInputChange = (index, value) => {
    if (/^\d+$/.test(value) || value === '') {
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

      const checkPasswordExists = async () => {
        try {
          const response = await axios.post('/auth', {
            email: email,
            password: oldPassword,
          });

          setPasswordExists(response.data === 'Authentication successful');
        } catch (error) {
          console.log('Error in checking password', error);
        }
      };

      checkPasswordExists();
    }
  }, [userExists, oldPassword]);

  useEffect(() => {
    setIsSamePassword(newPassword === repeatPassword);
  }, [newPassword, repeatPassword]);


  const handleSavePassword = async () => {
    if (isSamePassword) {
      try {
        const response = await axios.post('/passwords', {
          email: email,
          password: newPassword,
        });
        

        if (response.status === 200 ) {
          console.log('Password saved s');
          if(newPassword && repeatPassword !== ""){
          router.push('/');
          }else{
            console.log("You must to write something inside inputs")
          }
        } else {
          console.log('Error saving password');
        }
      } catch (error) {
        console.log('Error saving password', error);
      }
    } else {
      console.log('Passwords do not match');
    }
  };
  return (
<main className='bg-black w-full h-full flex justify-center items-center'>
  <div className='text-center'>
    {userExists ? (
      <div className='w-96 bg-black-900 h-72 flex flex-col items-center justify-center rounded-lg p-4 space-y-4'>
        {isCodeCorrect ? (
          <div className='w-72 bg-black flex flex-col items-center justify-center rounded-lg p-4 space-y-4'>
            <input
              className={` translate-x-[-25px] w-full h-10 bg-black ${isSamePassword ? '' : 'border border-red-500'} px-[-10px] border-green-600`}
              type='password'
              placeholder='Enter new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className={` translate-x-[-31px] w-full h-10 bg-black ${isSamePassword ? '' : 'border border-red-500'} px-2`}
              type='password'
              placeholder='Repeat new password'
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button
              className='bg-blue-500 px-8 py-2 mt-2 text-white translate-x-[-65px]'
              onClick={handleSavePassword}
              disabled={!isSamePassword}
            >
              Save Password
            </button>
          </div>
        ) : (
          <React.Fragment >
            <p    className='text-white  translate-x-[-60px]  text-xl mb-2'>Enter the verification code</p>
            <div className='flex   space-x-4 justify-center text-center'>
              {codeInputs.map((input, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  value={input}
                  className='  translate-x-[-60px] w-10 h-10 bg-black border rounded text-center text-white'
                  type='text'
                  maxLength='1'
                  onChange={(e) => handleCodeInputChange(index, e.target.value)}
                  onBlur={() => handleCodeInputBlur(index)}
                />
              ))}
            </div>
            <p className='pt-2 translate-x-[-60px]'>{generatedCode}</p>
          </React.Fragment>
        )}
      </div>
    ) : (
      <div className='w-96 h-72 bg-black rounded-lg p-4 flex flex-col items-center justify-center translate-x-[-60px]'>
        <p className='mb-4 text-white text-2xl text-center'>Enter your Email</p>
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
  )
        }
export default Page;
