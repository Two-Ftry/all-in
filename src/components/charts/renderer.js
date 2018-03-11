
import * as d3 from 'd3';
import BaseChart from './chart';

const rendererUtil = {
    svg (el, options, data, type) {
        options = options || {};
        const margins = options.margins || { top: 20, right: 20, bottom: 30, left: 40 };
        options['margins'] = margins;
        options['width'] = el.offsetWidth;
        options['height'] = el.offsetHeight;
        const _colors = d3.scaleOrdinal(d3.schemeCategory10)

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
            if (options.stack) {
                const stack = d3.stack();
                stack.keys(options.stack.keys);

                const area = d3.area()
                    .x((d) => {
                        return _chart.x()(d.data.key) + _chart.x().bandwidth() / 2;
                    })
                    .y0((d) => {
                        return _chart.y()(d[0]);
                    })
                    .y1((d) => {
                        return _chart.y()(d[1]);
                    });

                const layers = _bodyG.selectAll('g.layer')
                    .data(stack(options.stack.data))
                    .enter()
                    .append('g')
                    .classed('layer', true);

                layers.append('path')
                    .attr('d', (d, i) => {
                        return area(d);
                    })
                    .attr('stroke', (d, i) => {
                        return _colors(i);
                    })
                    .attr('fill', (d, i) => {
                        return _colors(i);
                    });

                return;
            }
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
            _bodyG.selectAll(`path.${type}`)
                .data(data)
                .enter()
                .append('path')
                .attr('class', type);

            // 退出
            _bodyG.selectAll(`path.${type}`)
                .data(data)
                .exit()
                .remove();
            // 更新
            _bodyG.selectAll(`path.${type}`)
                .data(data)
                .attr('d', (d) => {
                    return interpolate(d);
                })
                .style('fill', (d, i) => {
                    return type === 'line' ? 'none' : _colors(i)
                })
                .style('stroke', (d, i) => {
                    return _colors(i)
                })
                .style('stroke-width', 1);
        }

        function renderDots () {
            let dotsData = data;
            // if (options.stack) {
            //     dotsData = options.stack.data;
            // }
            dotsData.forEach((dataItem, i) => {
                _bodyG.selectAll(`circle.${type}-circle-${i}`)
                    .data(dataItem)
                    .enter()
                    .append('circle')
                    .attr('class', `${type}-circle-${i}`)
                    .attr('r', 5)
                    .attr('cx', (d) => {
                        return _chart.x()(d.name) + _chart.x().bandwidth() / 2;
                    })
                    .attr('cy', (d) => {
                        return _chart.y()(d.value);
                    })
                    .attr('stroke', () => {
                        return _colors(i)
                    })
                    .attr('fill', '#fff');
            });
        }

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