<template>
  <div class="LayoutDefault">
    <AppHeader />
    <main class="LayoutDefault__main">
      <slot />
    </main>
    <footer class="LayoutDefault__footer"></footer>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";

export default {
  name: "LayoutDefault",
  components: {
    AppHeader
  }
};
</script>