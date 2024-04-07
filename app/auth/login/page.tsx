'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter(); // Use the useRouter hook

  const handleLogin = async (event) => {
    event.preventDefault() // Prevent the default form submit action
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Logged in successfully!')
      router.push('/'); // Redirect to the home page

      // Navigate to dashboard or home page here if needed
    } catch (error) {
      console.error('Failed to login:', error.message)
      // Show error message to the user
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      console.log('Logged in with Google!')
      router.push('/'); // Redirect to the home page
      // Navigate to dashboard or home page here if needed
    } catch (error) {
      console.error('Failed to login with Google:', error.message)
      // Show error message to the user
    }
  }

  return (
    <Card className='mx-auto max-w-sm mt-20'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className='grid gap-4'>
          {' '}
          {/* Add form and handleLogin */}
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
              <Link href='#' className='ml-auto inline-block text-sm underline'>
                Forgot your password?
              </Link>
            </div>
            <Input
              id='password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
        <Button variant='outline' className='w-full' onClick={handleGoogleLogin}>
          Login with Google
        </Button>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/auth/signup' className='underline'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
