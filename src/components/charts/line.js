
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

        // 创建尺度
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
            .rangeRound([0, w]);

        // 画坐标轴
        const yAxis = d3.axisLeft(yScale);
        svg.append('g')
            .call(yAxis);

        const xAxis = d3.axisBottom(xScale);
        svg.append('g')
            .attr('transform', `translate(0, ${h})`)
            .call(xAxis);

        // 使用d3.line()计算x、y坐标
        const line = d3.line()
            .x(function (d) {
                return xScale(d.name) + xScale.bandwidth() / 2;
            })
            .y(function (d) {
                return yScale(d.value);
            });

        // 画线条
        // 进入
        svg.selectAll('path.line')
            .data([data])
            .enter()
            .append('path')
            .attr('class', 'line');

        // 退出
        svg.selectAll('path.line')
            .data([data])
            .exit()
            .remove();

        const initData = [];
        data.forEach((d) => {
            initData.push({
                name: d.name,
                value: data[0].value
            });
        })
        // 更新
        svg.selectAll('path.line')
            .data([data])
            .attr('d', (d) => {
                return line(d);
            })
            // .transition()
            // .duration(1000)
            // .attrTween('d', (d) => {
            //     const interpolate = d3.scaleLinear()
            //         .domain([0, 1])
            //         .range([initData, d]);
            //     return (t) => {
            //         return line(interpolate(t));
            //     }
            // })
            .style('fill', 'none')
            .style('stroke', 'green')
            .style('stroke-width', 1);

        // 画圆圈
        svg.selectAll('circle.line-circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'line-circle')
            .attr('r', 5)
            .attr('cx', (d) => {
                return xScale(d.name) + xScale.bandwidth() / 2;
            })
            .attr('cy', (d) => {
                return yScale(d.value);
            });
    },
    canvas () {
        // todo
    }
}

/**
 * 创建条形图
 * @param {*} el
 * @param {*} options
 */
export function line (el, options, data) {
    options = options || {};
    options.renderer = options.renderer || 'svg';

    renderer[options.renderer](el, options, data);
};