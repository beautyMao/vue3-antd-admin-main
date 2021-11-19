<template>
  <TimePicker v-model:value="value" format="HH:mm" />
</template>
<script>
import dayjs from 'dayjs'
import { defineComponent, ref, watch } from 'vue'
import { TimePicker } from 'ant-design-vue'

export default defineComponent({
  components: { TimePicker },

  setup() {
    const value = ref(dayjs('12:08', 'HH:mm'))

    watch(value, () => {
      console.log(value.value)
    })

    return {
      value,
      dayjs
    }
  }
})
</script>
