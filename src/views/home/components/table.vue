<template>
  <a-spin :spinning="loading">
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
        <li @click="emit('goPage', Object.keys(item)[0])">更多...</li>
      </ul>
    </div>
  </a-spin>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, PropType, computed, ref } from 'vue'
import { Spin } from 'ant-design-vue'

export default defineComponent({
  props: {
    tableList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    [Spin.name]: Spin
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
  justify-content: flex-start;
  flex-wrap: wrap;
  ul,
  li {
    list-style: none;
  }
  ul {
    width: 30%;
    padding: 0;
    flex: none;
    margin-right: 10px;

    li {
      margin-bottom: 10px;
      cursor: pointer;
    }
    .sen {
      color: blue;
      text-decoration: underline;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
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
