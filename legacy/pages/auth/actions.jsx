'use client';

import { createClient } from '../../utils/supabase/client';
import { redirect } from 'next/navigation';

export async function logout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect('/error');
    }
}

export async function updateCipherInformation(uuid, game_type, solved, time) {
    const supabase = createClient();

    if (solved) {
        const { error } = await supabase.from('user_stats').update({}).increment({ total_played: 1 }).eq('user_id', uuid).eq('game_type', game_type);
    }

    else {
        const { error } = await supabase.from('user_stats').update({}).increment({ total_played: 1, total_solved: 1 }).eq('user_id', uuid).eq('game_type', game_type);
    }

    if (error) {
        redirect('/error');
    }
}