/**
 * 矩形式树状结构图
 */

import * as d3 from 'd3';
import BaseChart from './chart';

var _nodes = [
    {'name': 'Eve', 'parent': '', value: 17},
    {'name': 'Cain', 'parent': 'Eve', value: 1},
    {'name': 'Seth', 'parent': 'Eve', value: 4},
    {'name': 'Enos', 'parent': 'Seth', value: 2},
    {'name': 'Noam', 'parent': 'Seth', value: 2},
    {'name': 'Abel', 'parent': 'Eve', value: 3},
    {'name': 'Awan', 'parent': 'Eve', value: 4},
    {'name': 'Enoch', 'parent': 'Awan', value: 4},
    {'name': 'Azura', 'parent': 'Eve', value: 5}
];

function renderCell (_bodyG, options, _chart) {
    var _colors = d3.scaleOrdinal(d3.schemeCategory20c);
    var _treemap = d3.treemap().round(true)
        .size([_chart.coordinate.quadrantWidth(), _chart.coordinate.quadrantHeight()]);

    var stratify = d3.stratify().id(function (d) { return d.name; })
        .parentId(function (d) { return d.parent; });

    var root = stratify(_nodes)
        .sum(function (d) { return d.value; })
        .sort(function (a, b) {
            // console.log('@@@stratify', a, b)
            return b.height - a.height || b.value - a.value;
        });
    // var root = d3.hierarchy(_tree)
    //     .sum(function (d) {
    //         return d.size;
    //     });

    // var nodes = _treemap(root);
    _treemap(root);

    console.log('@@@root leaves', root.leaves());

    var cells = _bodyG.selectAll('g')
        .data(root.leaves());

    // 进入
    const cellEnter = cells.enter()
        .append('g')
        .attr('class', 'cell');

    cellEnter.append('rect');
    cellEnter.append('text');

    _bodyG.selectAll('g')
        .data(root.leaves())
        .transition()
        .attr('transform', (d) => {
            return `translate(${d.x0},${d.y0})`;
        })
        .select('rect')
        .attr('width', (d) => {
            return (d.x1 - d.x0);
        })
        .attr('height', (d) => {
            return (d.y1 - d.y0);
        })
        .style('fill', (d, i) => {
            return _colors(i);
        });

    _bodyG.selectAll('g')
        .data(root.leaves())
        .select('text')
        .attr('x', (d) => {
            return (d.x1 - d.x0) / 2;
        })
        .attr('y', (d) => {
            return (d.y1 - d.y0) / 2;
        })
        .attr('dy', '.35rem')
        .attr('text-anchor', 'middle')
        .text((d) => {
            return d.id + '\n' + d.value;
        })

    _bodyG.selectAll('g')
        .data(root.leaves())
        .exit().remove();
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

        // const _coordinate = _chart.coordinate;

        _chart.render = () => {
            if (!_svg) {
                _svg = d3.select(el).append('svg')
                    .attr('height', options.height)
                    .attr('width', options.width);
            }
            _bodyG = _chart.renderBody(_svg, _bodyG, _chart);
            renderCell(_bodyG, options, _chart)
        };

        // 自动渲染
        _chart.render();

        return _chart;
    }
}

/**
 * 创建柱状图
 * @param {*} el
 * @param {*} options
 */
export function treemap (el, options, data) {
    options = options || {};
    options.renderer = options.renderer || 'svg';

    renderer[options.renderer](el, options, data);
};