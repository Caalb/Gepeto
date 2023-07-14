<template>
  <div>
    <GPTChat />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GPTChat from "@/components/GPTChat.vue";

export default defineComponent({
  name: "HomeView",
  components: { GPTChat },
});
</script>
