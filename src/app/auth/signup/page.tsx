"use client";

import Link from 'next/link'
import React,{ useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


const Page = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      if(password1!==password2) return;
      await signup(email, password1);
      router.push('/editor');
    } catch (err) {
      
    }
  };

  return (
    <div className='items-center mt-16 md:mt-32 flex h-screen flex-col text-[#333333] '>
      <div className='flex'>
      <img src="/Vector(2).png"/>
      <div className='font-bold text-3xl ml-2'>devlinks</div>
      </div>
      <div className='flex flex-col mx-4 w-96'>
      <div className='text-2xl font-bold mt-16 '>Create account</div>
      <p>Let get you started sharing your links!</p>
      <form onSubmit={handleSubmit}>
      <label className='text-xs mt-5 relative' htmlFor='email'>Email address</label>
      <div className='relative flex mt-1'>
         <input type="email" id="email" placeholder='e.g. alex@email.com' className='h-14 border rounded-lg pl-8 w-full focus:border-[#633CFF]' required value={email} onChange={(e) => setEmail(e.target.value)}></input>
         <img src='/Vector.png' className='absolute self-center mx-2'/>
      </div>

      <label className='text-xs mt-5 relative' htmlFor='password'>Create password</label>
      <div className='relative flex mt-1'>
         <input type="password" id="password" placeholder='At least 8 characters' className='h-14 border rounded-lg pl-8 w-full focus:border-[#633CFF]' required value={password1} onChange={(e) => setPassword1(e.target.value)}></input>
         <img src='/Vector(1).png' className='absolute self-center mx-2'/>
      </div>

      <label className='text-xs mt-5 relative' htmlFor='password'>Confirm password</label>
      <div className='relative flex mt-1'>
         <input type="password" id="password" placeholder='At least 8 characters' className='h-14 border rounded-lg pl-8 w-full focus:border-[#633CFF]' required value={password2} onChange={(e)=> setPassword2(e.target.value)}></input>
         <img src='/Vector(1).png' className='absolute self-center mx-2'/>
      </div>

      <p className='text-xs mt-5'>Password must contain at least 8 characters</p>


      <button className='w-full h-12 text-white bg-[#633CFF] mt-5 rounded-lg items-center flex justify-center font-semibold '>Create new account</button>
      </form>

      <p className='self-center mt-3'>Already have an account?<Link href="/auth/login" className='text-[#633CFF]'>Login</Link></p>
      
      
      </div>
      
    </div>
  )
}

export default Page