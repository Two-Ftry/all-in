<template>
  <div>Foo.vue</div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
        // 触发 action 后，会返回 Promise
        console.log('@@@@@@@@@!!!!!!222');
        return store.dispatch('fetchItem',0)
    },
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted () {
    console.log('!!!!!')
  },

  methods: {}
}

</script>
<style lang='less' scoped>
</style>