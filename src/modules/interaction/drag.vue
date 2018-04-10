<template>
  <div class="drag-box">
      <svg ref="dragsvg"></svg>
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
        this.svg = d3.select(this.$refs.dragsvg);
        this.width = this.$refs.dragsvg.scrollWidth;
        this.height = this.$refs.dragsvg.scrollHeight;
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
            const drag = d3.drag()
                .on('drag', move);

            this.svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('r', r)
                .attr('transform', (d) => {
                    return `translate(${d})`;
                })
                .call(drag);

            function move () {
                const x = d3.event.x;
                const y = d3.event.y;
                if (isBoundaries(x, y)) {
                    d3.select(this).attr('transform', `translate(${x}, ${y})`);
                }
            }
            function isBoundaries (x, y) {
                return (x >= (0 + r) && x <= (width - r)) &&
                    (y >= (0 + r) && y <= (height - r));
            }
        }
    }
}
</script>
<style lang='less' scoped>
.drag-box{
    height: 100%;
    svg{
        width: 100%;
        height: 100%;
    }
}
</style>