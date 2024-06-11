import { supabase } from '$lib/supabase';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const users = await supabase.from("users").select("*");
    const images = await supabase.from("images").select("*");
    return {
        users: JSON.stringify(users.data),
        images: JSON.stringify(images.data)
    };
};
