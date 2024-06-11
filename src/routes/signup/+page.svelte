<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';

    let email = '';
    let password = '';
    let username = '';
    let name = '';
    let phone = '';
    let user = '';
    let error = '';
    let signUpMethod = 'email';

    const signUp = async (event) => {
        name = username;
        let response;

        if (signUpMethod === 'email') {
            response = await supabase.auth.signUp(
                { 
                    email, 
                    password, 
                    options: {
                        data: { username }
                    } 
                }
            );
        } else if (signUpMethod === 'phone') {
            response = await supabase.auth.signUp(
                { 
                    phone, 
                    password, 
                    options: {
                        channel: 'sms',
                        data: { username }
                    } 
                }
            );
        }

        const { data, error } = response;

        if (error) {
            console.error('Error signing up:', error);
            event.preventDefault();
            alert("Oops, try again!");
            return;
        }

        if (data) {
            await supabase.from('users').insert([{ email: email || null, phone: phone || null, name: name }]);
            console.log('Signed up successfully');
            event.preventDefault();
            alert("Signed up!");
            navigateToHome();
        }
    };

    const navigateToHome = () => {
        if (error) {
            console.error('Navigation error:', error);
        } else {
            window.location.href = '/login';
        }
    };

    onMount(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            user = session?.user || '';
            error = session?.error || '';
        });
    });
</script>

<div class="signup-page">
    <div class="signup-form">
        <div class="container">
            <form on:submit|preventDefault={signUp}>
                <div class="form-group">
                    <label>
                        <input type="radio" value="email" bind:group={signUpMethod}>
                        Sign up with Email
                    </label>
                    <label>
                        <input type="radio" value="phone" bind:group={signUpMethod}>
                        Sign up with Phone
                    </label>
                </div>
                {#if signUpMethod === 'email'}
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email" placeholder="Email" bind:value={email}>
                    </div>
                {/if}
                {#if signUpMethod === 'phone'}
                    <div class="form-group">
                        <label for="phone">Phone:</label>
                        <input type="text" name="phone" id="phone" placeholder="Phone" bind:value={phone}>
                    </div>
                {/if}
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" name="username" id="username" placeholder="Username" bind:value={username}>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Password" bind:value={password}>
                </div>
                <div class="form-group">
                    <button type="submit">Sign up</button>
                </div>
                <div class="form-group">
                    <a href="/login">Go back</a>
                </div>
            </form>
        </div>
    </div>
</div>