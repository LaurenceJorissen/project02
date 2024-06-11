import { supabase } from '$lib/supabase';
/** @type {import('./$types').PageServerLoad} */
export async function load({ params}) {
    const userId = params.Id;
    if (!userId) {
        return {
            error: 'No user ID provided'
        };
    }

    const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, name, email, savedImages') // Include necessary user data
        .eq('id', userId)
        .single();

    if (userError) {
        console.error('Error fetching user profile:', userError);
        return {
            error: 'Error fetching user profile'
        };
    }

    const { data: images, error: imagesError } = await supabase
        .from('images')
        .select('name, imageUrl, description')
        .eq('userId', userId);

    if (imagesError) {
        console.error('Error fetching user images:', imagesError);
        return {
            error: 'Error fetching user images'
        };
    }

    const {currentUser, error} = 0

    return {
        user: JSON.stringify(user),
        images: JSON.stringify(images),
        currentUser: JSON.stringify(currentUser) // Pass current user's data to the client
    };
};

/** @type {import('./$types').Actions} */
export const actions = {
    followUser: async ({ params }) => {
        const { userId, followerId } = params;
        // Add follower to the user's followers array
        const { error: followError } = await supabase
            .from('users')
            .update({ followers: supabase.sql('followers || ' + followerId) })
            .eq('id', userId);
        if (followError) {
            console.error('Error following user:', followError);
            return {
                error: 'Error following user'
            };
        }
        return {
            success: 'User followed successfully'
        };
    },

    unfollowUser: async ({ params }) => {
        const { userId, followerId } = params;
        // Remove follower from the user's followers array
        const { error: unfollowError } = await supabase
            .from('users')
            .update({ followers: supabase.sql('array_remove(followers, ' + followerId + ')') })
            .eq('id', userId);
        if (unfollowError) {
            console.error('Error unfollowing user:', unfollowError);
            return {
                error: 'Error unfollowing user'
            };
        }
        return {
            success: 'User unfollowed successfully'
        };
    }
};