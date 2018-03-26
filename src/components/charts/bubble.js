
import * as d3 from 'd3';
import BaseChart from './chart';

function renderDots (svg, dotsData, chart, colors) {
    const type = 'dots';
    if (!colors) {
        colors = d3.scaleOrdinal(d3.schemeCategory10)
    } else {
        colors = d3.scaleOrdinal(colors);
    }
    dotsData.forEach((dataItem, i) => {
        svg.selectAll(`circle.${type}-circle-${i}`)
            .data(dataItem)
            .enter()
            .append('circle')
            .attr('class', `${type}-circle-${i}`)
            .attr('r', (d) => {
                return d.value > 20 ? 20 : (d.value < 5 ? 5 : d.value);
            })
            .attr('cx', (d) => {
                return chart.x()(d.name) + chart.x().bandwidth() / 2;
            })
            .attr('cy', (d) => {
                return chart.y()(d.value);
            })
            .attr('fill', () => {
                return colors(i)
            });
    });
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
            renderDots(_bodyG, data, _chart, options.colors)
        };

        // 创建y轴尺度
        let valueData = [];
        options.series.forEach((d) => {
            if (options.stack && valueData.length > 0) {
                valueData = valueData.map((item, i) => {
                    return item + d.data[i];
                });
            } else {
                valueData = valueData.concat(d.data)
            }
        });
        const max = d3.max(valueData);
        const yScale = d3.scaleLinear()
            .domain([0, max])
            .rangeRound([_coordinate.quadrantHeight(), 0]);
        _chart.y(yScale); // 1

        // 创建x轴尺度
        const categoryData = options.xAxis.data;
        const xScale = d3.scaleBand()
            .domain(categoryData)
            .range([0, _coordinate.quadrantWidth()]);
        _chart.x(xScale); // 2

        // 自动渲染
        _chart.render();

        return _chart;
    }
}

/**
 * 创建散点图|气泡图
 * @param {*} el
 * @param {*} options
 */
export function bubble (el, options, data) {
    options = options || {};
    options.renderer = options.renderer || 'svg';

    renderer[options.renderer](el, options, data);
};