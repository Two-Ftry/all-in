<template>
  <div class="card-page">
    <div class="card-inner-page">
      <card-chart v-for="(d, index) in chartsData" :chart-data="d" :key="index"></card-chart>
    </div>
  </div>
</template>

<script>
import CardChart from './CardChart.vue'
import dataTemplate from './dataTemplate.js';
export default {
    mixins: [dataTemplate],
    data () {
        return {
        };
    },

    components: {
        CardChart
    },

    computed: {},

    mounted () {},

    methods: {
    }
}
</script>
<style lang='less' scoped>
.card-page {
  height: 100%;
  overflow: auto;
}
.card-inner-page{
  padding: 20px;
}
</style>