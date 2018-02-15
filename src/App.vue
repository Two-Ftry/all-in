<template>
<div id="app">
    <sidebar></sidebar>
    <div class="content">
      <router-view></router-view>
    </div>
</div>
</template>

<script>
import Sidebar from './modules/sidebar/Sidebar.vue';
export default {
  data () {
    return {
    };
  },

  asyncData ({ store, route }) {
    return store.dispatch('getUserInfo');
  },

  components: {
    Sidebar
  },

  computed: {},

  mounted () {

  },

  methods: {}
}

</script>
<style lang='less' scoped>
.content {
  height: 100%;
  margin-left: 200px;
  background-color: aquamarine;
}
</style>