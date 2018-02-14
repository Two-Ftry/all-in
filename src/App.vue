<template>
<div id="app">
  <div class="root-box">
     <ul>
       <li>
         <router-link to="foo">Foo</router-link>
       </li>
       <li>
         <router-link to="bar">Bar</router-link>
       </li>
       <li>
         <router-link to="baz">Baz</router-link>
       </li>
     </ul>
      my ssr App.vue@@@999
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