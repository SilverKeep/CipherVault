'use client';

import navStyles from '../styles/navigation.module.css';

import { createClient } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            router.push('/error');
        } else {
            router.push('/');
        }
    };

    return <button className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`} onClick={handleLogout}>Logout</button>;
}