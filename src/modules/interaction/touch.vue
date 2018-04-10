<template>
  <div class="touch">
      <svg ref="touchsvg"></svg>
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
        this.svg = d3.select(this.$refs.touchsvg);
        this.initTouch();
    },

    methods: {
        initTouch () {
            this.svg.on('touchstart', this.renderCircle)
                .on('touchend', this.renderCircle);
        },
        renderCircle () {
            d3.event.preventDefault();
            // const data = d3.touches(this.svg.node());
            const g = this.svg.selectAll('g.touch')
                .data(d3.touches(this.svg.node()), (d) => {
                    return d.identifier;
                });

            const arc = d3.arc()
                .innerRadius(19)
                .outerRadius(20);

            const me = this;
            // 进入
            g.enter()
                .append('g')
                .attr('class', 'touch')
                .attr('transform', (d) => {
                    return `translate(${d[0]},${d[1]})`;
                })
                .append('path')
                .attr('class', 'touch-circle')
                .attr('fill', 'red')
                .attr('stroke', 'none')
                .transition()
                .duration(2000)
                .attrTween('d', () => {
                    const scale = d3.scaleLinear()
                        .range([
                            {
                                startAngle: 0,
                                endAngle: 0
                            },
                            {
                                startAngle: 0,
                                endAngle: 2 * Math.PI
                            }
                        ])
                    return (t) => {
                        return arc(scale(t));
                    }
                })
                .on('end', function (d) {
                    const g = d3.select(this.parentNode);
                    if (complete(g)) {
                        me.ripples(d);
                    }
                    g.remove();
                })

            // 退出
            g.exit().remove().each(function () {
                this.__stopped__ = true;
            });

            function complete (g) {
                return g.node().__stopped__ !== true;
            }
        },
        ripples (position) {
            for (let i = 1; i < 5; i++) {
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
                    .attr('r', 200)
                    .style('stroke-opacity', 0)
                    .on('end', function () {
                        d3.select(this).remove();
                    })
            }
        }
    }
}
</script>
<style lang='less' scoped>
.touch{
    height: 100%;
    svg{
        width: 100%;
        height: 100%;
        user-select: none;
    }
}
</style>