<template>
  <div class="zoom-box">
      <svg ref="zoomsvg"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
    data () {
        return {
            svg: null,
            width: 0,
            height: 0,
            r: 50
        };
    },

    components: {},

    computed: {},

    mounted () {
        this.svg = d3.select(this.$refs.zoomsvg);
        this.width = this.$refs.zoomsvg.scrollWidth;
        this.height = this.$refs.zoomsvg.scrollHeight;
        this.init();
    },

    methods: {
        init () {
            const width = this.width;
            const height = this.height;
            const r = this.r;
            const data = [
                [width / 2 - r, height / 2 - r],
                [width / 2 - r, height / 2 + r],
                [width / 2 + r, height / 2 - r],
                [width / 2 + r, height / 2 + r]
            ];
            this.svg = this.svg.call(d3.zoom().scaleExtent([1, 10]).on('zoom', zoom))
                .append('g');

            this.svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('r', r)
                .attr('transform', (d) => {
                    return `translate(${d})`;
                });
            const me = this;
            function zoom () {
                me.svg.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y})scale(${d3.event.transform.k})`);
            }
        }
    }
}
</script>
<style lang='less' scoped>
.zoom-box{
    height: 100%;
    svg{
        width: 100%;
        height: 100%;
    }
}
</style>