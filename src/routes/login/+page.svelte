<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    let email = '';
    let password = '';
    let user = null;
    let errorMessage = '';
    let images = [];
    let currentImage = null;
    let isEmojiVisible = false;

    let showEmoji = () => {
        isEmojiVisible = true;
    }

    let hideEmoji = () => {
        isEmojiVisible = false;
    }

    const signInWithPassword = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            errorMessage = 'Error signing in: ' + error.message;
        } else {
            window.location.href = '/profile';
        }
    };

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const fetchImages = async () => {
        const { data, error } = await supabase
            .from('images')
            .select('*');
        if (error) {
            console.error('Error fetching images:', error);
        } else {
            images = shuffle(data);
            currentImage = images[0];
        }
    };

    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user || null;

        if (user) {
            window.location.href = '/profile';
        }

        await fetchImages();
            setTimeout(() => {
            isEmojiVisible = false;
        }, 2000);

        let index = 0;
        setInterval(() => {
            if (images.length > 0) {
                currentImage = images[index];
                index = (index + 1) % images.length;
            }
        }, 5000);
    });
</script>

<div class="login-page">
    <div class="login-form">
        {#if user}
            <div class="container">
                <h2>Welcome, {user.email}!</h2>
            </div>
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        {:else}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="container">
                <form on:submit|preventDefault={signInWithPassword}>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email" placeholder="Email" bind:value={email}>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="Password" bind:value={password}>
                    </div>
                    {#if errorMessage}
                        <div class="error-message">{errorMessage}</div>
                    {/if}
                    <div class="form-group">
                        <button type="submit" on:mouseover={showEmoji} on:mouseout={hideEmoji}>Sign in</button>
                    </div>
                    <div class="form-group">
                        <p>Don't have an account yet? <a href="/signup">Sign up</a> here!</p>
                    </div>
                    <span class="emoji" class:visible={isEmojiVisible}>&#129488;</span>
                </form>
            </div>
        {/if}
    </div>
    <div class="image-container">
        {#if currentImage}
            <img src={currentImage.imageUrl} alt={currentImage.name}>
            <div class="image-details">
                <h3>{currentImage.name}</h3>
                <p>{currentImage.description}</p>
            </div>
        {/if}
    </div>
</div>
