<script>
    export let data;
    const user = JSON.parse(data.user);
    const images = JSON.parse(data.images);

    let selectedImageInfo = '';
    let selectedImages = new Set();
    let emailLink = '';

      const navigateToUserProfile = () => {
        if (user.id) {
            window.location.href = `/usersProfile/${user.id}`;
        } else {
            console.error("User profile not found");
        }
    };
    
    const handleImageSelect = (image) => {
        const imageInfo = `         -- Image Name: ${image.name}, Image ID: ${image.id}\n`;
        if (selectedImages.has(image.id)) {
            selectedImages.delete(image.id);
            selectedImageInfo = selectedImageInfo.replace(imageInfo, '');
        } else {
            selectedImages.add(image.id);
            selectedImageInfo += imageInfo;
        }
        updateEmailLink();
    };

    const updateEmailLink = () => {
        let senderName = 'User'; 
        if (typeof window !== 'undefined' && localStorage.getItem('currenUserName')) {
            senderName = localStorage.getItem('currenUserName');
        }
        const subject = encodeURIComponent(`${senderName} is interested in your images`);
        const body = encodeURIComponent(`"Give here some extra details:"\n\n Selected images that I'm interested in:\n${selectedImageInfo}\n"Leave some extra contact information:"\n\nBest regards,\n${senderName}`);
        emailLink = `mailto:${user.email}?subject=${subject}&body=${body}`;
    };

    updateEmailLink();
</script>
<div class="profile">
    <div class="container">
        <div class="form-group">
            <h1>Contact Page</h1>
            <p>Send a mail to {user.name}</p>
                <h2>How to Send an Email</h2>
                <ol>
                    <li>Select the images you are interested in by clicking on them. Clicking twice would remove the image.</li>
                    <li>Click on the email address link to open your email client. The selected image information will be pre-filled in the email subject and body.</li>
                    <li>Ensure to complete the email and then send it.</li>
                </ol>
        </div>
        <p>
            <a href={emailLink}><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></a>
            <a href={emailLink}>{user.email}</a>

        </p>
        <div class="gallery-container">
                <h2>User Images</h2>
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                {#each images as image}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img class="img-contactpagina" src={image.imageUrl} alt={image.name} width="100" on:click={() => handleImageSelect(image)} 
                    style="cursor: pointer; margin: 10px; border: {selectedImages.has(image.id) ? '2px solid blue' : 'none'}"
                    />
                {/each}

        </div>
        <!-- Text area to display selected image information -->
        <form class="form-group">
                <label for="imageInfo">Selected Image Info:</label>
            <textarea class="textarea-contactpagina" id="imageInfo" rows="10" cols="120" readonly bind:value={selectedImageInfo}></textarea>
        </form>
        <form class="form-group">
            <button type="button" on:click={navigateToUserProfile}>Back to Profile</button>
        </form>
    </div>
</div>