
import * as d3 from 'd3';
import BaseChart from './chart';

function renderColumn (svg, options, data, chart) {
    const h = chart.coordinate.quadrantHeight();
    // 进入
    svg.selectAll('.column')
        .data(data)
        .enter()
        .append('rect')
        .classed('column', true)
        .attr('width', chart.x().bandwidth())
        .attr('height', (d) => {
            return 0;
        });

    if (!options.colors) {
        options.colors = d3.scaleOrdinal(d3.schemeCategory10)
    } else {
        options.colors = d3.scaleOrdinal(options.colors)
    }
    svg.selectAll('.column')
        .data(data)
        .style('fill', function (i) {
            return options.colors(i);
        })

    // 退出
    svg.selectAll('.column')
        .data(data)
        .exit()
        .remove();

    // 更新
    svg.selectAll('.column')
        .data(data)
        .attr('x', (d) => {
            return chart.x()(d.name);
        })
        .transition()
        .duration(1000)
        .attrTween('y', (d) => {
            const interpolate = d3.scaleLinear()
                .domain([0, 1])
                .range([h, chart.y()(d.value)])
            return (t) => {
                return interpolate(t);
            }
        })
        .attrTween('height', (d) => {
            const interpolate = d3.scaleLinear()
                .domain([0, 1])
                .range([0, h - chart.y()(d.value)])
            return (t) => {
                return interpolate(t);
            }
        })
}

const renderer = {
    svg (el, options, data) {
        options = options || {};
        const margins = options.margins || { top: 20, right: 20, bottom: 30, left: 40 };
        options['margins'] = margins;
        options['width'] = el.offsetWidth;
        options['height'] = el.offsetHeight;

        const _chart = new BaseChart(options);

        let _svg = null; // 画布
        let _bodyG = null; // 绘图的主体

        const _coordinate = _chart.coordinate;

        _chart.render = () => {
            if (!_svg) {
                _svg = d3.select(el).append('svg')
                    .attr('height', options.height)
                    .attr('width', options.width);
            }
            _chart.renderAxes(_svg);
            _bodyG = _chart.renderBody(_svg, _bodyG);
            renderColumn(_bodyG, options, data, _chart)
        };

        const valueData = data.map((d) => {
            return d.value;
        });
        const max = d3.max(valueData);
        const yScale = d3.scaleLinear()
            .domain([0, max])
            .range([_coordinate.quadrantHeight(), 0]);
        _chart.y(yScale);

        const categoryData = data.map((d) => {
            return d.name;
        });
        const xScale = d3.scaleBand()
            .domain(categoryData)
            .rangeRound([0, _coordinate.quadrantWidth()])
            .paddingInner([0.1])
            .paddingOuter([0.1]);
        _chart.x(xScale);

        // 自动渲染
        _chart.render();

        return _chart;
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