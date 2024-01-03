<script lang='ts'>
  import { onMount } from "svelte";
    import { spring, type SpringOpts } from "svelte/motion";
    import { fade } from "svelte/transition";

    // variables
    let isToggled = false;
    let isToggleable = true;

    let bodyElmt : HTMLBodyElement;

    onMount(() => {
        bodyElmt = document.body as HTMLBodyElement;
    })

    // functions
    function toggleNavbar() {
        if (!isToggleable) return;
        isToggled = !isToggled;
        
        // prevent unintentional multiple click
        isToggleable = false;
        setTimeout(() => isToggleable = true, 100)

        if (isToggled) { // nav is opened
            // disable scrolling
            bodyElmt?.classList.add('height-full');
            bodyElmt?.classList.add('overflow-hidden');

            // animate nav button change
            rect1Rot.set({z:-45, x:0.657837, y:24.2166}); rect1Pos.set({x:0.657837, y:24.2166})
            rect2Rot.set({z:45, x:5.52551, y:1}); rect2Pos.set({x:5.52551, y:1})
        } else { // nav is closed
            // enable scrolling
            bodyElmt?.classList.remove('height-full');
            bodyElmt?.classList.remove('overflow-hidden');

            // animate nav button change
            rect1Rot.set({z:0, x:0, y:0}); rect1Pos.set({x:0, y:0})
            rect2Rot.set({z:0, x:0, y:0}); rect2Pos.set({x:0, y:11})
        }
    }

    const springOption : SpringOpts = {
        stiffness: 0.05,
        damping: 0.25
    }

    // transform state for rect 1
    let rect1Rot = spring({
        z:0, x:0, y:0
    }, springOption)
    
    let rect1Pos = spring({
        x:0, y:11
    })

    // transform state for rect 2
    let rect2Rot = spring({
        z:0, x:0, y:0
    }, springOption)
    
    let rect2Pos = spring({
        x:0, y:0
    })

</script>

<nav class="py-5 flex justify-center bg-secondary_dark text-white z-50 relative w-screen">
    <div class="w-4/5 flex justify-between">
        <a href="/" class="w-24 text-white font-bold no-underline relative">
            <h3>Addin Munawwar</h3>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute top-0.5 right-3">
                <rect y="7.82886" width="14" height="14" transform="rotate(-30 0 7.82886)" fill="#81D8DE"/>
            </svg>
        </a>  
        <button on:click={toggleNavbar} class="flex py-2">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="{$rect1Pos.x}" y="{$rect1Pos.y}" width="33.6" height="5" fill="#81D8DE"
                    transform="rotate({$rect1Rot.z} {$rect1Rot.x} {$rect1Rot.y})"
                />
                <rect x="{$rect2Pos.x}" y="{$rect2Pos.y}" width="33.6" height="5" fill="white" 
                    transform="rotate({$rect2Rot.z} {$rect2Rot.x} {$rect2Rot.y})"
                />
                {#if !isToggled}
                    <rect x="15.2" y="22" width="18.4" height="5" fill="white" transition:fade={{duration:200}}/>
                {/if}
            </svg>
        </button>
    </div>
</nav>

{#if isToggled}
    <div class="h-screen w-screen bg-secondary_dark fixed top-0 z-20 flex items-center justify-center" transition:fade={{duration:200}}>
        <div class="w-4/5 flex flex-col gap-8 items-end">
            <a href="/" class="text-white text-3xl">Home</a>
            <a href="/posts" class="text-white text-3xl">Posts</a>
            <a href="/resume" class="text-white text-3xl">Resume</a>
            <a href="/tags" class="text-white text-3xl">Tags</a>
            <a href="/posts/search" class="text-white text-3xl">Search</a>
        </div>
    </div>
{/if}