<template>
  <div class="flex-box">
    <a-textarea
      style="width: 600px"
      v-model:value="value"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />

    <a-button type="primary" size="large" @click="analysisBtn('+')">+</a-button>
    <a-button type="primary" size="large" @click="analysisBtn('-')">-</a-button>
  </div>
  <div class="lqbz-box flex-box">
    <div style="width: 600px">
      <div v-show="delTreeNodeShow">过滤的词:{{ delTreeNode }}</div>
    </div>
    <a-checkbox @change="onCheckboxChange" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, watch, computed, ref } from 'vue'
import { getTokenByHome } from '@/api/system/user'
import { postAnalysis } from '@/api/system/home'
type StepType = '+' | '-'

export default defineComponent({
  components: {},
  props: {
    listVal: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    let value = ref<string>('')
    let delTreeNode = ref<string>('')
    let delTreeNodeShow = ref(false)
    let homeToke = ''

    getTokenByHome().then((res) => {
      homeToke = res
    })

    // 监听父组件传值
    watch(
      () => props.listVal,
      (newVal) => {
        value.value = newVal
      }
    )

    const analysisBtn = (step: StepType) => {
      if (value.value == '') return false
      postAnalysis({ sentence: value.value, step, token: homeToke }).then((res) => {
        const newVal = res?.data?.afterAnalysisSentence || ''
        value.value = newVal
        delTreeNode.value = res?.data?.delTreeNode || ''
      })
    }

    const onCheckboxChange = () => {
      delTreeNodeShow.value = !delTreeNodeShow.value
    }

    return { value, analysisBtn, delTreeNode, delTreeNodeShow, onCheckboxChange }
  }
})
</script>
<style lang="scss" scoped>
.flex-box {
  align-items: center;
  display: flex;

  button {
    margin-left: 20px;
  }
}

.content {
  display: flex;
  justify-content: space-between;

  .right {
    border: 1px solid #000;
    font-size: 20px;
    text-align: center;
    width: 200px;
    height: 400px;
  }
}
textarea {
  max-width: 600px;
}
</style>
