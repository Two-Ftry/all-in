<template>
<div id="app">
  <div class="root-box">
      my ssr App.vue@@@
      <ul>
        <li>
          <router-link to="foo">foo</router-link>
        </li>
        <li>
          <router-link to="bar">bar</router-link>
        </li>
      </ul>
      <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  asyncData ({ store, route }) {
    return store.dispatch('getUserInfo');
  },

  components: {},

  computed: {},

  mounted () {

  },

  methods: {}
}

</script>
<style lang='less' scoped>
.root-box{
  color: red;
}
</style>