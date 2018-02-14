<template>
<div id="app">
  <div class="root-box">
      my ssr App.vue@@@
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
  </div>
</div>
</template>

<script>
export default {
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
.root-box{
  color: red;
}
</style>