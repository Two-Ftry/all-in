<template>
  <div class="card-page">
    <card-chart v-for="(d, index) in chartsData" :chart-data="d" :key="index"></card-chart>
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
  padding: 20px;
}
</style>