<template>
  <div class="card-page">
    <card-chart></card-chart>
    <!-- <card-chart></card-chart>
    <card-chart></card-chart> -->
  </div>
</template>

<script>
import CardChart from './CardChart.vue'
export default {
  data () {
    return {
    };
  },

  components: {
    CardChart
  },

  computed: {},

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>
.card-page {
  padding: 20px;
}
</style>