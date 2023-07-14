<template>
  <div class="container">
    <div class="response-container">
      <p class="text-white">Resposta</p>

      <div v-html="response" class="text-white"></div>
    </div>

    <div class="input-container">
      <NInput
        placeholder="Digita alguma coisa"
        type="text"
        clearable
        v-model:value="value"
      />

      <NButton type="primary" @click="submitMessage"> Enviar </NButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { fetchMessage } from "@/api";
import { NInput, NButton, useLoadingBar } from "naive-ui";

export default defineComponent({
  name: "GPTChat",
  components: {
    NInput,
    NButton,
  },

  setup() {
    const value = ref("");
    const response = ref("");
    const request_pending = ref(false);

    const loadingBar = useLoadingBar();
    const disabledRef = ref(true);

    const loading_start = () => {
      loadingBar.start();
      disabledRef.value = false;
    };

    const loading_finish = () => {
      loadingBar.finish();
      disabledRef.value = true;
    };

    const loading_fail = () => {
      loadingBar.error();
      disabledRef.value = true;
    };

    const submitMessage = async () => {
      response.value = "Buscando resposta...";
      loading_start();
      request_pending.value = true;
      await fetchMessage({ message: value.value })
        .then(({ data: { choices } }) => {
          response.value = choices[0].message.content;
        })
        .catch(() => {
          response.value = "Erro ao buscar resposta";
          loading_fail();
        })
        .finally(() => {
          loading_finish();
          request_pending.value = false;
        });
    };

    return {
      value,
      response,
      request_pending,
      submitMessage,
    };
  },
});
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
}
.input-container {
  display: flex;
  width: 300px;
  margin: 0auto;
  gap: 8px;
}

.response-container {
  padding-inline: 10rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.text-white {
  color: white;
  margin: 0;
}
</style>
