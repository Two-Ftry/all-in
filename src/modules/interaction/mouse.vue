<template>
  <div ref="mouse" class="mouse">
      <svg ref="mousesvg"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
    data () {
        return {
            svg: null
        };
    },

    components: {},

    computed: {},

    mounted () {
        this.svg = d3.select(this.$refs.mousesvg);
        this.initPosition();
    },

    methods: {
        initPosition () {
            const positionLabel = this.svg.append('text')
                .attr('x', 10)
                .attr('y', 30);
            this.svg.on('mousemove', () => {
                printPosition();
            })
            const me = this;
            function printPosition () {
                const position = d3.mouse(me.svg.node());
                positionLabel.text(position);
            }

            // 点击事件
            const r = 200;
            this.svg.on('click', () => {
                for (let i = 1; i < 5; i++) {
                    const position = d3.mouse(me.svg.node());
                    this.svg.append('circle')
                        .attr('cx', position[0])
                        .attr('cy', position[1])
                        .attr('r', 0)
                        .attr('fill', 'none')
                        .attr('stroke', 'red')
                        .transition()
                        .delay(Math.pow(i, 2.5) * 50)
                        .duration(2000)
                        .ease(d3.easeQuadIn)
                        .attr('r', r)
                        .style('stroke-opacity', 0)
                        .on('end', function () {
                            d3.select(this).remove();
                        })
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
.mouse{
    height: 100%;
    svg{
        width: 100%;
        height: 100%;
    }
}
</style>