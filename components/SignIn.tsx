import React, { useState } from "react";

import { useSignInEmailPassword } from "@nhost/nextjs";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInEmailPassword, error } = useSignInEmailPassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
  };

  return (
    <div className='my-4'>
      <div className='my-6'>
        <h1 className='text-3xl'>Sign In</h1>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <div className='mt-1'>
            <input
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              className='block w-full rounded-md py-2 px-2 border  border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
            />
          </div>
        </div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <div className='mt-1'>
            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='password'
              className='block w-full rounded-md py-2 px-2 border  border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
            />
          </div>
        </div>
        <div>
          <button
            type='submit'
            className='inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Sign In
          </button>
        </div>
        {error && <div>{error.message}</div>}
      </form>
    </div>
  );
}
