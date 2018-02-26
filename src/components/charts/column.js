
import * as d3 from 'd3';

const renderer = {
    svg (el, options, data) {
        options = options || {};
        const margin = options.margin || { top: 20, right: 20, bottom: 30, left: 40 };
        const w = el.offsetWidth - margin.left - margin.right;
        const h = el.offsetHeight - margin.top - margin.bottom;

        const svg = d3.select(el)
            .append('svg')
            .attr('width', w + margin.left + margin.right + 'px')
            .attr('height', h + margin.top + margin.bottom + 'px')
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const valueData = data.map((d) => {
            return d.value;
        });
        const max = d3.max(valueData);
        const yScale = d3.scaleLinear()
            .domain([0, max])
            .range([h, 0]);

        const categoryData = data.map((d) => {
            return d.name;
        });
        const xScale = d3.scaleBand()
            .domain(categoryData)
            .rangeRound([0, w])
            .paddingInner([0.1])
            .paddingOuter([0.1]);

        // 画坐标轴
        const yAxis = d3.axisLeft(yScale);
        svg.append('g')
            .call(yAxis);

        const xAxis = d3.axisBottom(xScale);
        svg.append('g')
            .attr('transform', `translate(0, ${h})`)
            .call(xAxis);

        // 进入
        svg.selectAll('.column')
            .data(data)
            .enter()
            .append('rect')
            .classed('column', true)
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => {
                // return yScale(0) - yScale(d.value);
                return 0;
            });

        if (options.color) {
            svg.selectAll('.column')
                .data(data)
                .style('fill', options.color)
        }

        // 退出
        svg.selectAll('.column')
            .data(data)
            .exit()
            .remove();

        // 更新
        svg.selectAll('.column')
            .data(data)
            .attr('x', (d) => {
                return xScale(d.name);
            })
            // .attr('y', (d) => {
            //     return h - (yScale(0) - yScale(d.value));
            // })
            .transition()
            .duration(1000)
            // .attr('height', (d) => {
            //     return yScale(0) - yScale(d.value);
            // });
            .attrTween('y', (d) => {
                const interpolate = d3.scaleLinear()
                    .domain([0, 1])
                    .range([h, yScale(d.value)])
                return (t) => {
                    return interpolate(t);
                }
            })
            .attrTween('height', (d) => {
                const interpolate = d3.scaleLinear()
                    .domain([0, 1])
                    .range([0, h - yScale(d.value)])
                return (t) => {
                    return interpolate(t);
                }
            })
    },
    histogram (el, options, data) {
        console.log('@@@', el, options, data);
    }
}

/**
 * 创建柱状图
 * @param {*} el
 * @param {*} options
 */
export function column (el, options, data) {
    options = options || {};
    options.renderer = options.renderer || 'svg';

    renderer[options.renderer](el, options, data);
};