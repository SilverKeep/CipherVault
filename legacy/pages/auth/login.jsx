import { useRouter } from 'next/router'
import { useState } from 'react'

import { createClient } from '../../utils/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  async function logIn() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error)
    }

    const userID = data?.user?.id
    if (userID) {
      const { error1 } = await supabase.from('users').insert([{ id: userID, username: username }])
      const { error2, data } = await supabase.from('game_types').select('*')


      if (error1 || error2) {
        console.error(error1, error2)
      }
      console.log('User profile created successfully')
    }

    router.push('/')
  }

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error)
    }

    router.push('/')
  }

  return (
    <main>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <label htmlFor="username">Username:</label>
        <input id="username" type="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <button type="button" onClick={logIn}>Log in</button>
        <button type="button" onClick={signUp}>Sign up</button>
      </form>
    </main>
  )
}