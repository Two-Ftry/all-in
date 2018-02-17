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
        // chartsUtil.column(this.$refs.card, {});
        chartsUtil(this.$refs.card, {
            type: 'column',
            xAxis: {
                type: 'category',
                name: 'letter',
                data: ['A', 'B', 'C', 'D', 'E', 'F']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'A',
                    type: 'column',
                    data: [1, 2, 3, 4, 5, 99]
                }
            ]
        });
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