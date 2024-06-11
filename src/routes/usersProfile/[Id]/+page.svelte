<script>
    export let data;
    const user = JSON.parse(data.user);
    const images = JSON.parse(data.images);

    let selectedImage = null;
    let isModalOpen = false;

    const openModal = (image) => {
        selectedImage = image;
        isModalOpen = true;
    };

    const closeModal = () => {
        isModalOpen = false;
        selectedImage = null;
    };

    const navigateToContactPage = (userId) => {
        window.location.href = `/usersProfile/${userId}/contactpage`;
    };

</script>

<div class="profile">
    <div class="container">
        {#if user}
        <h1> {user.name}</h1>
            <form class="form-group">
                <button on:click={() => navigateToContactPage(user.id)}>Contact Page</button>
            </form>
            <h2>Images</h2>
            <div class="gallery">
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                {#each images as image}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="image-item" on:click={() => openModal(image)}>
                        <h3>{image.name}</h3>
                        <img src="{image.imageUrl}" alt="{image.name}">
                        <h5>{image.description}</h5>
                    </div>
                {/each}
            </div>
        {:else}
            <p>Loading...</p>
        {/if}

        {#if isModalOpen}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="modal" on:click={closeModal}>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="modal-content" on:click|stopPropagation>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span class="close" on:click={closeModal}>&times;</span>
                    <img src="{selectedImage.imageUrl}" alt="{selectedImage.name}">
                    <h3>{selectedImage.name}</h3>
                    <p>{selectedImage.description}</p>
                </div>
            </div>
        {/if}
    </div>
</div>