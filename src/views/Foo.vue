<template>
  <div>
      用户信息
      <br>
      <p>{{userInfo.name}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
    };
  },

  asyncData ({ store, route }) {
    return store.dispatch('getUserInfo');
  },

  components: {},

  computed: {
      ...mapGetters([
          'userInfo'
      ])
  },

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>
</style>