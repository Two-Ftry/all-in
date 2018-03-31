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
    // var _colors = d3.scaleOrdinal(d3.schemeCategory20c);
    const isVertical = false;
    const w = isVertical ? _chart.coordinate.quadrantWidth() : _chart.coordinate.quadrantHeight();
    const h = isVertical ? _chart.coordinate.quadrantHeight() : _chart.coordinate.quadrantWidth();
    var _tree = d3.tree()
        .size([w, h - 80]);

    var stratify = d3.stratify().id(function (d) { return d.name; })
        .parentId(function (d) { return d.parent; });

    var root = stratify(_nodes)
        .sum(function (d) { return d.value; })
        .sort(function (a, b) {
            return b.height - a.height || b.value - a.value;
        });

    _tree(root);

    // 画线
    const linkFn = isVertical ? d3.linkVertical()
        .x(function (d) { return d.x; })
        .y(function (d) { return d.y; })
        : d3.linkHorizontal()
            .x(function (d) { return d.y; })
            .y(function (d) { return d.x; })

    _bodyG.selectAll('.link')
        .data(_tree(root).links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', linkFn);

    // console.log('@@@root', root.descendants());
    const nodes = root.descendants();

    var treeNodes = _bodyG.selectAll('g.tree-node')
        .data(nodes);

    // 进入
    const cellEnter = treeNodes.enter()
        .append('g')
        .attr('class', 'tree-node');

    cellEnter.append('circle');
    cellEnter.append('text');

    _bodyG.selectAll('g.tree-node')
        .data(nodes)
        .transition()
        .attr('transform', (d) => {
            return `translate(${isVertical ? d.x : d.y},${isVertical ? d.y : d.x})`;
        })
        .select('circle')
        .attr('r', 4.5)
        .attr('stroke', 'red')
        .attr('fill', '#fff');

    _bodyG.selectAll('g')
        .data(nodes)
        .select('text')
        .attr('x', (d) => {
            return d.children ? -8 : 8;
        })
        .attr('y', (d) => {
            return 0;
        })
        .attr('dy', '.35rem')
        .attr('text-anchor', function (d) { return d.children ? 'end' : 'start'; })
        .text((d) => {
            return d.id;
        })

    _bodyG.selectAll('g.tree-node')
        .data(nodes)
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
export function tree (el, options, data) {
    options = options || {};
    options.renderer = options.renderer || 'svg';

    renderer[options.renderer](el, options, data);
};