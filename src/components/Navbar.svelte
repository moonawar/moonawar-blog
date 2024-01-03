<script lang='ts'>
    // variables
    let isToggled = false;
    let isToggleable = true;

    $: navStyle = isToggled ? 'fixed' : 'relative';

    // functions
    function toggleNavbar() {
        if (!isToggleable) return;
        isToggled = !isToggled;
        
        // prevent unintentional multiple click
        isToggleable = false;
        setTimeout(() => isToggleable = true, 100)
    }
</script>

<nav class="py-5 flex justify-center bg-secondary_dark text-white z-50 {navStyle} w-screen">
    <div class="w-4/5 flex justify-between">
        <a href="/" class="w-24 text-white font-bold no-underline relative">
            <h3>Addin Munawwar</h3>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0.5 right-3">
                <rect y="7.82886" width="14" height="14" transform="rotate(-30 0 7.82886)" fill="#81D8DE"/>
            </svg>
        </a>  
        <button on:click={toggleNavbar} class="flex py-2">
            {#if !isToggled}
                <svg width="34" height="27" viewBox="0 0 34 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="33.6" height="5" fill="white"/>
                    <rect y="11" width="33.6" height="5" fill="#81D8DE"/>
                    <rect x="15.2" y="22" width="18.4" height="5" fill="white"/>
                </svg>
            
            {:else}
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.657837" y="24.2166" width="33.6" height="6.4" transform="rotate(-45 0.657837 24.2166)" fill="#81D8DE"/>
                    <rect x="5.52551" y="1" width="33.6" height="6.4" transform="rotate(45 5.52551 1)" fill="white"/>
                </svg>
            {/if}
        </button>
    </div>
</nav>

{#if isToggled}
<div 
    class="h-screen w-screen bg-secondary_dark fixed top-0 z-20 
    flex flex-col justify-center items-end px-16 gap-8">
    <a href="/" class="text-white text-3xl">Home</a>
    <a href="/posts" class="text-white text-3xl">Posts</a>
    <a href="/resume" class="text-white text-3xl">Resume</a>
    <a href="/tags" class="text-white text-3xl">Tags</a>
    <a href="/posts/search" class="text-white text-3xl">Search</a>
</div>
{/if}