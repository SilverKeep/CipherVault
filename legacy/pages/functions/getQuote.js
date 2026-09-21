'use server';

import { createClient } from '../../utils/supabase/server-props';

export default async function getQuote(context) {
    const supabase = createClient(context);
    const { data, error } = await supabase.rpc('get_random_text');

    if (error || !data) {
        console.error("Error loading quote:", error?.message || "No quote found");
        return null;
    }
    return data.text;
}