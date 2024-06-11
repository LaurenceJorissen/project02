<script>
     import { onMount } from 'svelte';
     import { supabase } from '$lib/supabase';
     let username = '';
     let user = '';
     let pictureFile;
     let pictureUrl = '';
     let images = [];
     let paintingName = '';
     let description = '';
     let searchTerm = '';
     let selectedImages = [];
     let showModal = false;
     let selectedImageUrl = '';
     let selectedImageName = '';
     let selectedImageDescription = '';
     let showEditModal = false;
     let newImageName = '';
     let errorMessage = '';
     let showErrorModal = false;
     let showSettings = false;
     let newImageDescription = '';
     let newUsername = '';

    
     const loadSavedImagesFromDatabase = async () => {
        try {
            const userId = localStorage.getItem('currentUserId');
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('savedImages')
                .eq('id', userId)
                .single();

            if (userError) {
                console.error('User not found:', userError);
                return;
            }

            const savedImages = userData.savedImages || [];
            const savedImagesMapped = savedImages.map(image => ({
                imageName: image[0],
                imageDescription: image[1],
                imageUrl: image[2],
                userId: image[3],
                userName: image[4]
            }));

            const localLikedImages = JSON.parse(localStorage.getItem('likedImages') || '[]');

            if (localLikedImages.length === 0) {
                localStorage.setItem('likedImages', JSON.stringify(savedImagesMapped));
            } else {
                const imagesToAddToDB = localLikedImages.filter(
                    localImage => !savedImagesMapped.some(dbImage => dbImage.imageUrl === localImage.imageUrl)
                );

                const imagesToAddToLocalStorage = savedImagesMapped.filter(
                    dbImage => !localLikedImages.some(localImage => localImage.imageUrl === dbImage.imageUrl)
                );

                // Insert images into the savedImages array in the users table
                const updatedSavedImages = [...savedImages, ...imagesToAddToDB];

                // Update the user's data with the modified savedImages array
                const { error: updateError } = await supabase
                    .from('users')
                    .update({ savedImages: updatedSavedImages })
                    .eq('id', userId);

                if (updateError) {
                    console.error('Error updating user data:', updateError.message);
                    return;
                }

                const updatedLocalLikedImages = [...localLikedImages, ...imagesToAddToLocalStorage];
                localStorage.setItem('likedImages', JSON.stringify(updatedLocalLikedImages));
            }
        } catch (error) {
            console.error('Error loading saved images from database:', error.message);
        }
    };


     const uploadPicture = async () => {
        if (!pictureFile) {
            errorMessage = 'Please select an image to upload.';
            showErrorModal = true;
            return;
        }

        if (!paintingName.trim()) {
            errorMessage = 'Please enter a painting name.';
            showErrorModal = true;
            return;
        }

        if (paintingName.trim().length > 30) {
            errorMessage = 'The painting name cannot exceed 30 characters.';
            showErrorModal = true;
            return;
        }

        if (description.trim().length > 400) {
            errorMessage = 'The description cannot exceed 400 characters.';
            showErrorModal = true;
            return;
        }

        const { data, error } = await supabase.storage
            .from('images')
            .upload(`public/${pictureFile.name}`, pictureFile, { cacheControl: '3600', upsert: false });

        if (error) {
            showErrorModal = true;
            errorMessage = 'Image already exists on this website';
            return console.error('Error uploading image:', error.message);
        }

        const { data: publicUrlData, error: urlError } = await supabase
            .storage
            .from('images')
            .getPublicUrl(`public/${pictureFile.name}`);

        if (urlError) {
            return console.error('Error getting public URL:', urlError.message);
        }

        pictureUrl = publicUrlData.publicUrl;

        const { data: insertData, error: insertError } = await supabase
            .from('images')
            .insert([{ name: paintingName, imageUrl: pictureUrl, description: description, userId: user.id }]);

        if (insertError) {
            return console.error('Error inserting image data:', insertError.message);
        }

        fetchImages();
    }

    const deleteSelectedPictures = async () => {
        if (!selectedImages.length) {
            errorMessage = 'Please select images to delete';
            showErrorModal = true;
            return console.error('Please select images to delete.');
        }

        try {
            const userId = localStorage.getItem('currentUserId');

            // Remove images from storage and database
            for (const imageUrl of selectedImages) {
                // Delete image from storage
                const imageNameInStorage = imageUrl.split('/').pop();
                await supabase.storage.from('images').remove(`public/${imageNameInStorage}`);

                // Delete image from images table
                await supabase
                    .from('images')
                    .delete()
                    .eq('imageUrl', imageUrl)
                    .eq('userId', userId);

                // Remove image from the savedImages array in the users table
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('savedImages')
                    .eq('id', userId)
                    .single();

                if (userError) {
                    console.error('User not found:', userError);
                    continue;
                }

                const savedImages = userData.savedImages || [];
                const updatedSavedImages = savedImages.filter(image => image[2] !== imageUrl);

                await supabase
                    .from('users')
                    .update({ savedImages: updatedSavedImages })
                    .eq('id', userId);

                // Remove image from local storage
                const localLikedImages = JSON.parse(localStorage.getItem('likedImages') || '[]');
                const updatedLocalLikedImages = localLikedImages.filter(image => image.imageUrl !== imageUrl);
                localStorage.setItem('likedImages', JSON.stringify(updatedLocalLikedImages));
            }

            // Clear selected images after deletion
            selectedImages = [];
            // Fetch images after delete
            fetchImages();
            // Close edit modal after delete
            closeEditModal();
        } catch (error) {
            console.error('Error deleting images:', error.message);
        }
    };

    const updateImageDetails = async (newName, newDescription) => {
        if (!newName.trim()) {
            return console.error('Please enter a new name for the image.');
        }

        if (selectedImageName === newName && selectedImageDescription === newDescription) {
            return closeEditModal();
        }

        const updates = {};
        if (selectedImageName !== newName) {
            updates.name = newName;
        }
        if (selectedImageDescription !== newDescription) {
            updates.description = newDescription;
        }

        const { data: updateData, error: updateError } = await supabase
            .from('images')
            .update(updates) // Pass an object with the column names and their new values
            .eq('imageUrl', selectedImageUrl)
            .eq('userId', user.id);

        if (updateError) {
            return console.error('Error updating image details:', updateError.message);
        }

        // Update the details in the images array
        const index = images.findIndex(image => image.url === selectedImageUrl);
        if (index !== -1) {
            if (updates.name) {
                images[index].name = newName;
            }
            if (updates.description) {
                images[index].description = newDescription;
            }
        }

        // Update the savedImages array in the users table
        const userId = localStorage.getItem('currentUserId');
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('savedImages')
            .eq('id', userId)
            .single();

        if (userError) {
            console.error('User not found:', userError);
            return;
        }

        const savedImages = userData.savedImages || [];
        const updatedSavedImages = savedImages.map(image => {
            if (image[2] === selectedImageUrl) {
                return [newName, newDescription, selectedImageUrl, user.id, user.name];
            }
            return image;
        });

        await supabase
            .from('users')
            .update({ savedImages: updatedSavedImages })
            .eq('id', userId);

        // Update the image in local storage if it exists
        const localLikedImages = JSON.parse(localStorage.getItem('likedImages') || '[]');
        const updatedLocalLikedImages = localLikedImages.map(image => {
            if (image.imageUrl === selectedImageUrl) {
                return { ...image, imageName: newName, description: newDescription };
            }
            return image;
        });
        localStorage.setItem('likedImages', JSON.stringify(updatedLocalLikedImages));

        closeEditModal();
    };

  // Function to fetch images from the database
  const fetchImages = async () => {
        try {
            // Fetch user session
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            // Handle errors related to user session
            if (sessionError || !sessionData?.session?.user?.id) {
                console.error('Error fetching user session:', sessionError);
                return;
            }

            // Extract user ID
            const userId = sessionData.session.user.id;

            // Fetch images associated with the user ID
            const { data, error } = await supabase
                .from('images')
                .select('name, imageUrl, description')
                .eq('userId', userId);

            // Handle errors related to fetching images
            if (error) {
                console.error('Error fetching images:', error);
                return;
            }

            // Update the images array with the fetched data
            images = data.map(item => ({
                name: item.name,
                url: item.imageUrl,
                description: item.description,
                selected: false
            }));
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

 
     const fetchUser = async () => {
         const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
         if (sessionError || !sessionData?.session?.user?.id) {
             console.error('Error fetching user session:', sessionError);
             return window.location.href = '/login';
         }
 
         const userId = sessionData.session.user.id;
         // Check if the user already exists
         const { data: existingUser, error: fetchError } = await supabase
             .from('users')
             .select('name, email, id') // Select followers and following
             .eq('id', userId)
             .single();
 
         if (fetchError) {
             console.error('Error checking existing user:', fetchError);
             return;
         }
 
         username = existingUser.name;
         localStorage.setItem('currentUserId', existingUser.id);
         localStorage.setItem('currentUserName', existingUser.name);
         localStorage.setItem('currentUserEmail', existingUser.email);
         loadSavedImagesFromDatabase();
     };
     const updateUsername = async (newUsername) => {
        if (!newUsername.trim()) {
            return console.error('Please enter a new username.');
        }

        if (username === newUsername) {
            return; // No need to update if the new username is the same as the current one
        }

        const updates = {
            name: newUsername // Update the username in the UI
        };

        // Update the username in the users table
        const { data: updateData, error: updateError } = await supabase
            .from('users')
            .update(updates)
            .eq('id', user.id);

        if (updateError) {
            return console.error('Error updating username:', updateError.message);
        }

        username = newUsername; // Update the username in the UI

        // Fetch all user records containing savedImages
        const { data: allUsers, error: userError } = await supabase
            .from('users')
            .select('id, savedImages');

        if (userError) {
            console.error('Error fetching user records:', userError);
            return;
        }

        // Update userName in all occurrences of savedImages
        for (const userRecord of allUsers) {
            const userId = userRecord.id;
            const savedImages = userRecord.savedImages || [];

            const updatedSavedImages = savedImages.map(image => {
                if (image[3] === userId) {
                    return [image[0], image[1], image[2], userId, newUsername];
                }
                return image;
            });

            // Update savedImages in the users table
            await supabase
                .from('users')
                .update({ savedImages: updatedSavedImages })
                .eq('id', userId);

            // Update savedImages in local storage
            if (userId === user.id) {
                localStorage.setItem('likedImages', JSON.stringify(updatedSavedImages));
            }
        }
    };

     const signOut = async () => {
        localStorage.clear();
         await supabase.auth.signOut();
         user = null;
         window.location.href = '/login';
         
     };
 
     const enlargeImage = (imageUrl, imageName, imageDescription) => {
         selectedImageUrl = imageUrl;
         selectedImageName = imageName;
         selectedImageDescription = imageDescription; // Set the description
         showModal = true;
     };
 
     const closeModal = () => {
         showModal = false;
         selectedImageUrl = '';
     };
 
     const openEditModal = (imageUrl, imageName, imageDescription) => {
        selectedImageUrl = imageUrl;
        selectedImageName = imageName;
        selectedImageDescription = imageDescription; // Set the current image description
        newImageName = imageName; // Set the new image name to the current image name
        newImageDescription = imageDescription; // Set the new image description to the current image description
        showEditModal = true;
    };

 
     const closeEditModal = () => {
         showEditModal = false;
         selectedImageUrl = '';
         selectedImageName = '';
     };
 
     const toggleSelectImage = (imageName) => {
         const index = selectedImages.indexOf(imageName);
         if (index !== -1) {
             selectedImages.splice(index, 1); 
         } else {
             selectedImages = [...selectedImages, imageName];
         }
         fetchImages();
     };
 
     onMount(() => {
         supabase.auth.onAuthStateChange((event, session) => {
             user = session?.user || '';
            });
                fetchUser();
                fetchImages();

    });

    $: filteredImages = images.filter(image =>
        image.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isImageSelected = (imageName) => {
    return selectedImages.findIndex(name => name === imageName) !== -1;
};

const toggleSettings = () => {
    showSettings = !showSettings;
};

function closeErrorModal() {
    showErrorModal = false;
}


</script>
<div class="profile">
    {#if user}
        <div class="container">
            <h1>{username}</h1>
            <form class="form-group">
                <button on:click={toggleSettings}>Settings</button>
                <button on:click={signOut}>Sign Out</button>
            </form>
            <div class="search">
                <label for="search">Search images:</label>
                <input type="text" id="search" placeholder="Search by name" bind:value={searchTerm}>
            </div>
            {#if showSettings}
                <div class="settings">
                    <div class="form-group">
                        <label for="newUsername">New Username:</label>
                        <input type="text" id="newUsername" bind:value={newUsername}>
                        <button on:click={() => updateUsername(newUsername)}>Update Username</button>
                    </div>
                    <div class="form-group">
                        <label for="picture">Select an image:</label>
                        <input type="file" id="picture" on:change="{e => pictureFile = e.target.files[0]}">
                        <label for="paintingName">Give a name:</label>
                        <input type="text" name="paintingName" id="paintingName" placeholder="Painting Name" bind:value={paintingName}>
                        <label for="description">Description:</label>
                        <input type="text" name="description" id="description" placeholder="Description" bind:value={description}>
                        <button on:click|preventDefault={uploadPicture}>Upload</button>
                        <button on:click={deleteSelectedPictures}>Delete Image</button>
                        {#if pictureUrl}
                        <div class="image-preview">
                            <h2>Uploaded Image:</h2>
                            <!-- svelte-ignore a11y-img-redundant-alt -->
                            <img src="{pictureUrl}" alt="Uploaded Image">
                        </div>
                        {/if}
                    </div>
                </div>
            {/if}
        <div class="profile">
                <div class="gallery-container">
                    <div class="gallery">
                        {#each filteredImages as image}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <div class="image-item" class:selected={isImageSelected(image.url)} on:click={() => toggleSelectImage(image.url)} on:dblclick={() => enlargeImage(image.url, image.name, image.description)}>
                                <h3>{image.name}</h3>
                                <img src="{image.url}" alt="{image.name}">
                                <p>{image.description}</p>
                                {#if showSettings}
                                <form class="form-group">
                                    <button on:click={() => openEditModal(image.url, image.name)}>Edit</button>
                                </form>
                                {/if}
                            </div>                    
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Modals -->
            {#if showModal}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="modal" on:click={closeModal}>
                    <div class="modal-content" on:click|stopPropagation>
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <img src="{selectedImageUrl}" alt="Enlarged Image">
                        <p>{selectedImageName}</p>
                        <p>{selectedImageDescription}</p>
                        <button class="delete-button" on:click={closeModal}>Close</button>
                    </div>
                </div>
            {/if}

            {#if showEditModal}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                 <form class="form-group">
                    <div class="modal" on:click={closeEditModal}>
                        <div class="modal-content" on:click|stopPropagation>
                            <div class="form-group">
                                <label for="newImageName">New Name:</label>
                                <input type="text" id="newImageName" bind:value={newImageName} style="width: 80%;">
                            </div>
                            <div class="form-group">
                                <label for="newImageDescription">New Description:</label>
                                <input type="text" id="newImageDescription" bind:value={newImageDescription} style="width: 80%;">
                            </div>
                            <button on:click={() => updateImageDetails(newImageName, newImageDescription)}>Update Details</button>
                        </div>
                    </div>
                </form>
            {/if}        
            <form class="form-group">
                {#if showErrorModal}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="modal" on:click={closeErrorModal}>
                    <div class="modal-content" on:click|stopPropagation>
                        <p>{errorMessage}</p>
                        <button on:click={closeErrorModal}>Close</button>
                    </div>
                </div>
            {/if}
            </form>
        </div>
    {/if}
</div>