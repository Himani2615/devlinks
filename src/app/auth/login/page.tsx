"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  function validateInputs() {
    let isValid = true;

    if (!email) {
      isValid = false;
      setEmailError("Email can't be empty");
    } else {
      setEmailError('');
    }

    if (!password) {
      isValid = false;
      setPasswordError('Password can\'t be empty');
    } else {
      setPasswordError('');
    }

    return isValid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      await login(email, password);
      router.push('/editor');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='items-center mt-20 md:mt-40 flex h-screen flex-col text-[#333333]'>
      <div className='flex'>
        <Image src="/Vector(2).png" alt="Logo" />
        <div className='font-bold text-3xl ml-2'>devlinks</div>
      </div>
      <div className='flex flex-col mx-4'>
        <div className='text-2xl font-bold mt-20'>Login</div>
        <p>Add your details below to get back into the app</p>
        <form onSubmit={handleSubmit}>
          <label className='text-xs mt-5 relative' htmlFor='email'>Email address</label>
          <div className='relative flex mt-1'>
            <input
              type="email"
              id="email"
              placeholder='e.g. alex@email.com'
              className='h-14 border rounded-lg pl-8 w-full focus:border-[#633CFF]'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Image src='/Vector.png' alt="Email icon" className='absolute self-center mx-2' />
          </div>
          {emailError && <p className='text-red-500 text-xs'>{emailError}</p>}
          <label className='text-xs mt-5 relative' htmlFor='password'>Password</label>
          <div className='relative flex mt-1'>
            <input
              type="password"
              id="password"
              placeholder='Enter your password'
              className={`h-14 border rounded-lg pl-8 w-full focus:border-[#633CFF] ${passwordError ? 'border-red-500' : ''}`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Image src='/Vector(1).png' alt="Password icon" className='absolute self-center mx-2' />
          </div>
          {passwordError && <p className='text-red-500 text-xs'>{passwordError}</p>}
          <button
            type="submit"
            className='w-full h-12 text-white bg-[#633CFF] mt-5 rounded-lg items-center flex justify-center font-semibold'
          >
            Login
          </button>
        </form>
        {error && <p className='text-red-500 text-xs'>{error}</p>}
        <p className='self-center mt-3'>
          Don't have an account?
          <Link href="/auth/signup" className='text-[#633CFF]'> Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
