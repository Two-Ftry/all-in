<template>
  <div>
      Item.vue
      <br>
      {{item ? item.name : ''}}
  </div>
</template>

<script>
export default {
    asyncData ({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('fetchItem', route.params.id)
    },
    computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
        const id = parseInt(this.$route.params.id)
        const i = this.$store.state.items[id];
        console.log('@@@@', this.$store.state.items, id)
      return i;
    }
  },
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style lang='less' scoped>
</style>