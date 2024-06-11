<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    export let data;
    let headerFontSize = 10;

    const users = JSON.parse(data.users);
    let images = JSON.parse(data.images);
    let filteredImages = images;

    const navigateToProfile = (userId) => {
        window.location.href = `/usersProfile/${userId}`;
    };

    const findUserName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const filterImages = (query) => {
        if (!query.trim()) {
            filteredImages = images;
        } else {
            filteredImages = images.filter(image =>
                findUserName(image.userId).toLowerCase().includes(query.toLowerCase()) ||
                image.name.toLowerCase().includes(query.toLowerCase())
            );
        }
    };

    let isLiked = {};

    const checkLikedStatus = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userId = localStorage.getItem('currentUserId');
            const user = users.find(user => user.id === userId);
            if (!user) {
                console.error('User not found');
                return;
            }

            isLiked = {};

            const storedLikedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
            const savedImages = user.savedImages;
            const savedImageKeys = new Set(savedImages.map(image => `${image[3]}_${image[2]}`));
            storedLikedImages.forEach(likedImage => {
                const key = `${likedImage.userId}_${likedImage.imageUrl}`;
                isLiked[key] = savedImageKeys.has(key);
            });

            savedImages.forEach(image => {
                const key = `${image[3]}_${image[2]}`;
                isLiked[key] = true;
            });

            updateTrigger.set({});
        }
    };

    onMount(() => {
        loadSavedImagesFromDatabase();
        checkLikedStatus();
    });

    const updateTrigger = writable();

    const handleLike = (image) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const key = `${image.userId}_${image.imageUrl}`;
            const userId = localStorage.getItem('currentUserId');
            const user = users.find(user => user.id === userId);

            if (!isLiked[key]) {
                const likedImage = {
                    imageName: image.name,
                    imageDescription: image.description,
                    imageUrl: image.imageUrl,
                    userId: image.userId,
                    userName: findUserName(image.userId)
                };
                const storedLikedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
                storedLikedImages.push(likedImage);
                localStorage.setItem('likedImages', JSON.stringify(storedLikedImages));

                isLiked[key] = true;
            } else {
                const storedLikedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
                const updatedLikedImages = storedLikedImages.filter(likedImage => {
                    return !(likedImage.userId === image.userId && likedImage.imageUrl === image.imageUrl);
                });
                localStorage.setItem('likedImages', JSON.stringify(updatedLikedImages));
                isLiked[key] = null;
            }
            updateTrigger.set({});
        }
    };

    const loadSavedImagesFromDatabase = () => {
        try {
            const userId = localStorage.getItem('currentUserId');
            const user = users.find(user => user.id === userId);
            if (!user) {
                console.error('User not found');
                return;
            }

            const savedImages = user.savedImages;
            const likedImages = savedImages.map(image => ({
                imageName: image[0],
                imageDescription: image[1],
                imageUrl: image[2],
                userId: image[3],
                userName: image[4]
            }));
            localStorage.setItem('likedImages', JSON.stringify(likedImages));
            const filteredImageUrls = new Set(filteredImages.map(image => image.imageUrl));

            const storedLikedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
            const updatedLikedImages = storedLikedImages.filter(likedImage => {
                return filteredImageUrls.has(likedImage.imageUrl);
            });

            localStorage.setItem('likedImages', JSON.stringify(updatedLikedImages));
            checkLikedStatus();
        } catch (error) {
            console.error('Error loading saved images from database:', error.message);
        }
    };

    let selectedImage = null;
    let enlargedImageId = null;
    let enlargedImageStyle = "";
    let transitionInProgress = false;

    const handleImageClick = (image, event) => {
        if (enlargedImageId === image.imageUrl) {
            enlargedImageId = null;
            transitionInProgress = true;
            enlargedImageStyle = "transform: scale(1); z-index: 1;";
            setTimeout(() => {
                transitionInProgress = false;
                enlargedImageStyle = "";
            }, 500);
        } else {
            enlargedImageId = image.imageUrl;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const imageRect = event.target.getBoundingClientRect();
            const imageCenterX = imageRect.left + imageRect.width / 2;
            const imageCenterY = imageRect.top + imageRect.height / 2;

            const translateX = viewportWidth / 2 - imageCenterX;
            const translateY = viewportHeight / 2 - imageCenterY;

            enlargedImageStyle = `transform: translate(${translateX}px, ${translateY}px) scale(1.4); z-index: 1;`;
        }
    };

    const handleCloseModal = () => {
        selectedImage = null;
    };

</script>

<div class="front-page">
    <div class="container">
        <h1 style="font-size: {headerFontSize}rem;">Discovery page</h1>
        <div class="search">
            <form class="form-group">
                <input type="text" placeholder="Search by user name or image name" on:input={e => filterImages(e.target.value)}>
            </form>
        </div>
        <div class="gallery">
            {#each filteredImages as image}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="image-item {enlargedImageId === image.imageUrl ? 'enlarged' : ''}" on:dblclick={() => navigateToProfile(image.userId)} style="{enlargedImageId === image.imageUrl ? enlargedImageStyle : ''}">
                    <h3>{image.name}</h3>
                    <p>Uploaded by: {findUserName(image.userId)}</p>
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img src="{image.imageUrl}" alt="{image.name}" on:click={(e) => handleImageClick(image, e)}>
                    <p>{image.description}</p>
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span class="heart-icon" style="color: {isLiked[`${image.userId}_${image.imageUrl}`] ? '#4a3f35' : '#ccc'}" on:click={() => handleLike(image)}>&#10084;</span>
                </div>
            {/each}
        </div>
        {#if selectedImage !== null}
            <div class="modal">
                <div class="modal-content">
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span class="close" on:click={handleCloseModal}>&times;</span>
                    <h2>{selectedImage.name}</h2>
                    <p>Uploaded by: {findUserName(selectedImage.userId)}</p>
                    <img src="{selectedImage.imageUrl}" alt="{selectedImage.name}">
                    <p>{selectedImage.description}</p>
                </div>
            </div>
        {/if}
    </div>
</div>
