<template>
  <NConfigProvider :theme="theme">
    <NLoadingBarProvider>
      <router-view />
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import {
  darkTheme,
  GlobalTheme,
  NConfigProvider,
  NLoadingBarProvider,
} from "naive-ui";

export default defineComponent({
  components: {
    NConfigProvider,
    NLoadingBarProvider,
  },

  setup() {
    return {
      darkTheme,
      theme: ref<GlobalTheme | null>(null),
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #444444;
}
</style>
