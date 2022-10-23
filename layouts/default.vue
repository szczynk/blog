<template>
  <div
    id="default_layout"
    class="
      pt-16
      bg-white
      text-gray-700
      dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300
    "
  >
    <div
      id="trailer"
      class="
        w-5
        h-5
        bg-gray-700
        text-white
        dark:bg-white
        dark:text-gray-700
        rounded-full
        fixed
        top-0
        left-0
        z-[10000]
        pointer-events-none
        text-center
        p-0.5
      "
    >
      <IconTrailer id="trailer-icon" ref="trailer-icon" class="m-0"/>
    </div>
    <AppHeader />

    <main class="container mx-auto px-4 lg:px-8">
      <Nuxt />
    </main>
    <ScrollTopButton />

    <AppFooter />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      const trailer = document.getElementById("trailer");
      window.onmousemove = e => {
        const interactable = e.target.closest(".interactable")
        const interacting = interactable !== null

        trailer.dataset.type = interacting ? interactable.dataset.type : ""
        this.animateTrailer(trailer, e, interacting);
      };
    });
  },
  methods: {
    animateTrailer: (trailer, e, interacting)=>{
      const x = e.clientX - trailer.offsetWidth / 2;
      const y = e.clientY - trailer.offsetHeight / 2;
      const keyframes = {
          transform: `translate(${x}px, ${y}px) scale(${interacting ? 3 : 1})`
      };
      trailer.animate(keyframes, {
          duration: 500,
          fill: "forwards"
      });
    }
  },
}
</script>

<style>
#trailer{
  opacity: 0;
  transition: opacity 500ms ease;
}

#default_layout:hover > #trailer {
  opacity: 1;
}

#trailer:not([data-type=""])> #trailer-icon{
  opacity: 1;
}

#trailer-icon{
  opacity: 0;
  transition: opacity 500ms ease;
}
</style>
