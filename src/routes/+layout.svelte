<script>
    import { onMount } from 'svelte';
  
    let headerVisible = false;
    let mainVisible = false;
    let footerVisible = false;
  
    onMount(() => {
      setTimeout(() => {
        headerVisible = true;
        mainVisible = true;
        footerVisible = true;
      }, 100);
    });
  </script>

  <div class="mainContainer">
    <header class:visible={headerVisible}>
      <h1 class="header">Artgallery</h1>
      <button on:click={() => window.location.href = "/frontpage"}>Discovery page</button>
      <button on:click={() => window.location.href = "/savedImages"}>Saved images</button>
      <button on:click={() => window.location.href = "/profile"}>My profile</button>
    </header>
    <main class="mainContent" class:visible={mainVisible}>
      <slot />
    </main>
    <footer class:footer-visible={footerVisible}>
      <div class="footer-content">
        <div class="contact-info">
          <p>&copy; {new Date().getFullYear()} Artgallery. All rights reserved.</p>
              <p>Contact: info@artgallery.com | Phone: +1234567890</p>
          </div>
        </div>
    </footer>
  </div>
  