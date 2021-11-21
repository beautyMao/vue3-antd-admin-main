<template>
  <div class="flex-box">
    <a-textarea v-model:value="value" :auto-size="{ minRows: 2, maxRows: 5 }" />

    <a-button type="primary" @click="analysisBtn('+')">+</a-button>
    <a-button type="primary" @click="analysisBtn('-')">-</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, createVNode, computed, ref } from 'vue'
import { getToken } from '@/api/system/user'
import { postAnalysis } from '@/api/system/home'

type StepType = '+' | '-'

export default defineComponent({
  name: 'home',
  components: {},
  setup() {
    let value = ref<string>('')

    const analysisBtn = (step: StepType) => {
      postAnalysis({ sentence: value.value, step }).then((res) => {
        const newVal = res?.data?.afterAnalysisSentence || ''
        value.value = newVal
      })
    }

    return {
      value,
      analysisBtn
    }
  }
})
</script>
<style lang="scss" scoped>
textarea {
  max-width: 600px;
}
.flex-box {
  align-items: center;
  display: flex;
  button {
    margin-left: 20px;
  }
}
</style>
