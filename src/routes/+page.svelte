<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
  
    let user = '';
    let email = '';
    let password = '';
  
    const signInWithPassword = async () => {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) console.error('Error signing in:', error);
      else{
        window.location.href = '/profile'
      }
    };
    const signOut = async () => {
        const {error: signOutError} = await supabase.auth.signOut(); 
        if(signOutError){
            console.error('Error logging out:', signOutError);
        }
        else{
            user = null; 
            window.location.href = '/login';
        }
        };
    onMount(() => {
      supabase.auth.onAuthStateChange((event, session) => {
        user = session?.user || '';
      });
      window.location.href = '/login';
    });
  </script>
{#if user}
    <div class="container">
        <h2>Welcome, {user.name}!</h2>
        <p>You are signed in as {user.email}.</p>
        <button on:click={signOut}>sign out</button>
    </div>
{:else}
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
        <button type="submit">Sign in</button>
        </form>
        <p>Don't have an account yet? <a href="/signup">Sign up</a> here!</p>
    </div>
  {/if}