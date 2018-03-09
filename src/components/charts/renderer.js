
import * as d3 from 'd3';
import BaseChart from './chart';

const rendererUtil = {
    svg (el, options, data, type) {
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
            if (type === 'line') {
                renderLines();
            } else {
                renderArea();
            }
            renderDots();
        }

        function renderLines () {
            const line = d3.line()
                .curve(d3.curveCatmullRom.alpha(0.2))
                .x(function (d) {
                    return _chart.x()(d.name) + _chart.x().bandwidth() / 2;
                })
                .y(function (d) {
                    return _chart.y()(d.value);
                });
            renderRealLine(line);
        }

        function renderArea () {
            const area = d3.area()
                .curve(d3.curveCatmullRom.alpha(0.2))
                .x(function (d) {
                    return _chart.x()(d.name) + _chart.x().bandwidth() / 2;
                })
                .y0(_chart.y()(0))
                .y1(function (d) {
                    return _chart.y()(d.value);
                });
            renderRealLine(area);
        }

        function renderRealLine (interpolate) {
            // 画线条
            // 进入
            _bodyG.selectAll('path.line')
                .data(data)
                .enter()
                .append('path')
                .attr('class', 'line');

            // 退出
            _bodyG.selectAll('path.line')
                .data(data)
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
            _bodyG.selectAll('path.line')
                .data(data)
                .attr('d', (d) => {
                    return interpolate(d);
                })
                .style('fill', type === 'line' ? 'none' : 'green')
                .style('stroke', 'green')
                .style('stroke-width', 1);
        }

        function renderDots () {
            data.forEach((dataItem, i) => {
                _bodyG.selectAll('circle.line-circle-' + i)
                    .data(dataItem)
                    .enter()
                    .append('circle')
                    .attr('class', 'line-circle-' + i)
                    .attr('r', 5)
                    .attr('cx', (d) => {
                        return _chart.x()(d.name) + _chart.x().bandwidth() / 2;
                    })
                    .attr('cy', (d) => {
                        return _chart.y()(d.value);
                    });
            });
        }

        // 创建y轴尺度
        let valueData = [];
        options.series.forEach((d) => {
            valueData = valueData.concat(d.data)
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
    },
    canvas () {
        // todo
    }
};

const renderer = {
    line (el, options, data) {
        rendererUtil[options.renderer](el, options, data, 'line')
    },
    area (el, options, data) {
        rendererUtil[options.renderer](el, options, data, 'area')
    }
};

export default renderer;