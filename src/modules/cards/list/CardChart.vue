<template>
  <div class="card-chart">
      <div class="card" ref="card">
      </div>
  </div>
</template>

<script>
// import * as d3 from 'd3';
import chartsUtil from '../../../components/charts/index.js';
export default {
    props: {
        chartData: Object
    },

    data () {
        return {
            c3: null,
            chart: null
        };
    },

    components: {},

    computed: {},

    mounted () {
        this.initChart();
    },

    methods: {
        initChart () {
            chartsUtil(this.$refs.card, this.chartData);
        }
    }
}
</script>
<style lang='less' scoped>
.card-chart {
    display: inline-block;
    width: 33.333333%;
    height: 250px;
    border: 1px solid #ccc;
    border-radius: 4px;
    .card{
        width: 100%;
        height: 100%;
    }
}
</style>