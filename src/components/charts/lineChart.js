import * as d3 from 'd3';
import { coordinate } from './coordinate'

function lineChart (el) {
    const _chart = {};
    let _svg, _x, _y;
    const _width = el.offsetWidth;
    const _height = el.offsetHeight;
    const _margins = { top: 30, left: 30, right: 30, bottom: 30 };

    const options = {
        _width,
        _height,
        _margins
    };
    let _bodyG = null;
    let _line = null;
    const _data = [];
    const _colors = d3.scaleOrdinal(d3.schemeCategory20c);

    const _coordinate = coordinate(options);

    _chart.render = () => {
        if (!_svg) {
            _svg = d3.select(el).append('svg') // <-2B
                .attr('height', _height)
                .attr('width', _width);
        }
        // renderAxes(_svg);
        _coordinate.renderAxes(_svg, _x, _y);
        // _coordinate.defineBodyClip(_svg);
        renderBody(_svg);
        renderLines();
        renderDots();
    }

    function renderBody (svg) { // <-2D
        if (!_bodyG) {
            _bodyG = svg.append('g')
                .attr('class', 'body')
                .attr('transform', 'translate(' +
                        _coordinate.xStart() + ',' +
                        _coordinate.yEnd() + ')') // <-2E
            ;
        }
        // renderLines();

        // renderDots();
    }

    function renderLines () {
        _line = d3.line() // <-4A
            .x(function (d) { return _x(d.x); })
            .y(function (d) { return _y(d.y); });

        _bodyG.selectAll('path.line')
            .data(_data)
            .enter() // <-4B
            .append('path')
            .style('stroke', function (d, i) {
                return _colors(i); // <-4C
            })
            .attr('fill', 'none')
            .attr('class', 'line');
        _bodyG.selectAll('path.line')
            .data(_data)
            .transition() // <-4D
            .attr('d', function (d) { return _line(d); });
    }

    function renderDots () {
        _data.forEach(function (list, i) {
            _bodyG.selectAll('circle._' + i) // <-4E
                .data(list)
                .enter()
                .append('circle')
                .attr('class', 'dot _' + i);
            _bodyG.selectAll('circle._' + i)
                .data(list)
                .style('stroke', function (d) {
                    return _colors(i); // <-4F
                })
                .transition() // <-4G
                .attr('cx', function (d) { return _x(d.x); })
                .attr('cy', function (d) { return _y(d.y); })
                .attr('r', 4.5);
        });
    }

    // 设置x轴比例尺
    _chart.x = (x) => {
        if (!arguments.length) {
            return _x;
        }
        _x = x;
        _x.range([0, _coordinate.quadrantWidth()]);
        return _chart;
    }

    // 设置y轴比例尺
    _chart.y = (y) => {
        if (!arguments.length) {
            return _y;
        }
        _y = y;
        _y.range([_coordinate.quadrantHeight(), 0]);
        return _chart;
    }

    _chart.addSeries = function (series) { // <-1D
        _data.push(series);
        return _chart;
    };

    return _chart;
}

// export default lineChart;

export default (el) => {
    function randomData () {
        return Math.random() * 9;
    }

    const numberOfSeries = 2;
    const numberOfDataPoint = 11;
    const data = [];
    for (var i = 0; i < numberOfSeries; ++i) {
        data.push(d3.range(numberOfDataPoint).map(function (i) {
            return {x: i, y: randomData()};
        }));
    }
    var chart = lineChart(el)
        .x(d3.scaleLinear().domain([0, 10]))
        .y(d3.scaleLinear().domain([0, 10]));
    data.forEach(function (series) {
        chart.addSeries && chart.addSeries(series);
    });
    chart.render();
}