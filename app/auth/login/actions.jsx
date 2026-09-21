'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'

export async function login(formData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(previousState, formData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        options: {
            data: {
                username: formData.get('username')
            }
        }
    }

    const { error: signupError } = await supabase.auth.signUp(data);
    if (signupError) {
        console.error('Signup error:', signupError);
        if (signupError.status === 422) return 'Weak Password (must have 6+ characters with letters and numbers)'
        if (signupError.status === 500) return 'Username already exists or email does not exist'
        redirect('/error');
    }

    revalidatePath('/', 'layout')
    redirect('/?signup=success')
}
