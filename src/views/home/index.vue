<template>
  <div class="flex-box">
    <a-textarea
      v-model:value="value"
      placeholder="Autosize height with minimum and maximum number of lines"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />

    <a-button @click="analysisBtn('+')" type="primary">+</a-button>
    <a-button @click="analysisBtn('-')" type="primary">-</a-button>
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
    let token = '1454088038817931264'
    let value = ref<string>('')

    getToken().then((e) => {
      console.log(e)

      // token = e.toString()
      // token = '1453742585056272384'
    })

    const analysisBtn = (step: StepType) => {
      console.log(value)

      postAnalysis({ token, sentence: value.value, step }).then((res) => {
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
