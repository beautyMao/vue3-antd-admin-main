<template>
  <div class="content-list">
    <ul v-for="(item, index) in tableList" :key="index">
      <li class="title">
        <div>
          <span @click="emit('goPage', Object.keys(item)[0])">{{ Object.keys(item)[0] }}</span>
        </div>
      </li>
      <li
        v-for="(sen, i) in tableList[index][Object.keys(item)[0]].slice(0, 5)"
        :key="i"
        class="sen"
        @click="emit('setSen', sen.sentenceContent)"
      >
        {{ sen.sentenceContent }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, PropType, computed, ref } from 'vue'
export default defineComponent({
  props: {
    tableList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    return { emit }
  }
})
</script>
<style lang="scss" scoped>
.content-list {
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  ul,
  li {
    list-style: none;
  }
  ul {
    width: 30%;
    padding: 0;
    flex: none;
    margin-right: 20px;

    li {
      margin-bottom: 10px;
      cursor: pointer;
    }
    .sen {
      color: blue;
      text-decoration: underline;
      &:hover {
      }
    }
    .title {
      div {
        display: inline-block;
      }
    }
  }
}
</style>
