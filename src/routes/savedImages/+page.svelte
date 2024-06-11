<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { supabase } from '$lib/supabase';

    const likedImages = writable([]);
    let headerFontSize = 10; // Initial font size for the header

    const uploadLikedImagesToSupabase = async () => {
        try {
            const userId = localStorage.getItem('currentUserId');
            const likedImagesData = JSON.parse(localStorage.getItem('likedImages')) || [];

            const imageData = likedImagesData.map(image => Object.values(image));
            await supabase
                .from('users')
                .update({ savedImages: imageData })
                .eq('id', userId);

        } catch (error) {
            console.error('Error uploading liked images to Supabase:', error.message);
        }
    };

    const fetchSavedImagesFromDatabase = async () => {
        try {
            const userId = localStorage.getItem('currentUserId');
            const { data, error } = await supabase
                .from('users')
                .select('savedImages')
                .eq('id', userId)
                .single();
            if (error) {
                throw error;
            }

            return data.savedImages;
        } catch (error) {
            console.error('Error fetching saved images from database:', error.message);
            throw error;
        }
    };

    const navigateToProfile = (userId) => {
        window.location.href = `/usersProfile/${userId}`;
    };

    onMount(async () => {
        await uploadLikedImagesToSupabase();
        const savedImagesData = await fetchSavedImagesFromDatabase();
        likedImages.set(savedImagesData);
        setTimeout(() => {
            headerFontSize = 2;
        }, 500);
    });

</script>

<div class="Saved-images">
    <div class="container">
        <h1 style="font-size: {headerFontSize}rem;">Saved images</h1>
        <div class="gallery">
            {#each $likedImages as image}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="image-item" on:dblclick={navigateToProfile(image[3])}>
                <h3>{image[0]}</h3>
                <p>Uploaded by: {image[4]}</p>
                <img src="{image[2]}" alt="{image[0]}">
                <p> {image[1]}</p>
            </div>
            {/each}
        </div>
    </div>
</div>
