<template>
    <div>
      卡片信息：
      <br>
      {{card.name}}
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
    return store.dispatch('getCard');
  },

  components: {},

  computed: {
    ...mapGetters([
          'card'
      ])
  },

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>
</style>