<template>
  <cascader v-model:value="value" :options="stOptions" placeholder="Please select" />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Cascader } from 'ant-design-vue'
import { stOptions } from '@/mock/index'

export default defineComponent({
  components: {
    Cascader
  },
  setup() {
    return {
      value: ref<string[]>([]),
      stOptions
    }
  }
})
</script>
