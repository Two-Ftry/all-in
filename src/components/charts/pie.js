import * as d3 from 'd3';

const renderer = {
    svg (el, options, data) {
        options = options || { };
        const margin = options.margin || {top: 20, right: 20, bottom: 30, left: 40};
        const w = el.offsetWidth - margin.left - margin.right;
        const h = el.offsetHeight - margin.top - margin.bottom;

        const colors = d3.scaleOrdinal(d3.schemeCategory20c);

        // 创建arc标尺
        const radius = w > h ? h / 2 : w / 2;
        const arc = d3.arc()
            .outerRadius(options.outerRadius || radius)
            .innerRadius(options.innerRadius || (radius - 200 < 0 ? 0 : radius - 200))
            .cornerRadius(options.cornerRadius || 0)
            .padAngle(options.padAngle * Math.PI || 0);

        const svg = d3.select(el)
            .append('svg')
            .attr('width', w + margin.left + margin.right + 'px')
            .attr('height', h + margin.top + margin.bottom + 'px')
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // 进入
        svg.selectAll('path.arc')
            .data(data)
            .enter()
            .append('path')
            .classed('arc', true)
            .attr('fill', (d, i) => {
                return colors(i);
            });

        // 移除
        svg.selectAll('path.arc')
            .data(data)
            .exit()
            .remove();

        // 更新
        const prevAngle = {
            startAngle: 0,
            endAngle: 0
        };
        svg.selectAll('path.arc')
            .data(data)
            // .attr('d', (d) => {
            //     return arc(d);
            // })
            .attr('transform', `translate(${w / 2}, ${h / 2})`)
            .transition()
            .duration(1000)
            .attrTween('d', (d) => {
                const interpolate = d3.scaleLinear()
                    .domain([0, 1])
                    .range([prevAngle, d])
                // prevAngle = d;
                return (t) => {
                    return arc(interpolate(t));
                };
            });
    },
    canvas (el, options, data) {
        options = options || { };
        const margin = options.margin || {top: 20, right: 20, bottom: 30, left: 40};
        const w = el.offsetWidth - margin.left - margin.right;
        const h = el.offsetHeight - margin.top - margin.bottom;

        const colors = d3.scaleOrdinal(d3.schemeCategory20c);
        const canvas = d3.select(el)
            .append('canvas')
            .attr('width', w + margin.left + margin.right + 'px')
            .attr('height', h + margin.top + margin.bottom + 'px');

        const context = canvas._groups[0][0].getContext('2d');

        context.translate((w + margin.top + margin.bottom) / 2,
            (h + margin.left + margin.right) / 2);

        // 创建arc标尺
        const radius = Math.min(w, h) / 2;
        const arc = d3.arc()
            .outerRadius(options.outerRadius || radius)
            .innerRadius(options.innerRadius || (radius - 200 < 0 ? 0 : radius - 200))
            .cornerRadius(options.cornerRadius || 0)
            .padAngle(options.padAngle * Math.PI || 0)
            .context(context);

        // 创建饼图
        const arcs = d3.pie()(options.series[0].data);
        arcs.forEach((d, i) => {
            context.beginPath();
            arc(d);
            context.fillStyle = colors(i);
            context.fill();
        });

        // 画线
        context.beginPath();
        arcs.forEach((d) => {
            arc(d);
        });
        context.lineWidth = 1;
        context.strokeStyle = '#fff';
        context.stroke();

        // 画点
        // const dot = d3.symbol().context(context);
        context.beginPath();
        arcs.forEach((d, index) => {
            const c = arc.centroid(d);
            context.save();
            context.translate(c[0], c[1]);
            // dot();
            context.fillStyle = '#fff';
            // todo -5 -5, 一个固定对估算文本值，需要计算出来
            context.fillText(options.series[0].data[index], -5, -5)
            context.restore();
        });
        context.fillStyle = '#000';
        context.fill();
    }
};

/**
 * 创建饼图
 * @param {*} el
 * @param {*} options
 * @param {*} data
 */
export function pie (el, options, data) {
    options = options || {};
    options.renderer = options.renderer || 'svg';

    renderer[options.renderer](el, options, data);
}