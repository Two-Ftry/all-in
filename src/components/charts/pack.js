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
    {'name': 'EnochEnochEnochEnochEnochEnoch', 'parent': 'Awan', value: 4},
    {'name': 'Azura', 'parent': 'Eve', value: 5}
];

function renderPack (_bodyG, options, _chart) {
    var _colors = d3.scaleSequential(d3.interpolateMagma)
        .domain([-4, 4]);
    const w = _chart.coordinate.quadrantWidth();
    const h = _chart.coordinate.quadrantHeight();
    var _pack = d3.pack()
        .size([w, h])
        .padding(3);

    var stratify = d3.stratify().id(function (d) { return d.name; })
        .parentId(function (d) { return d.parent; });

    var root = stratify(_nodes)
        .sum(function (d) { return d.value; })
        .sort(function (a, b) {
            return b.height - a.height || b.value - a.value;
        });

    _pack(root);

    // console.log('@@@root', root.descendants());
    const nodes = root.descendants();

    var packNodes = _bodyG.selectAll('g.pack-node')
        .data(nodes);

    // 进入
    const packEnters = packNodes.enter()
        .append('g')
        .attr('class', 'pack-node');

    packEnters.append('circle');

    // hover
    packEnters.each(function (d) {
        d.node = this;
    }).on('mouseover', hovered(true))
        .on('mouseout', hovered(false));
    function hovered (hover) {
        return (d) => {
            d3.selectAll(d.ancestors().map(function (d) {
                return d.node;
            })).classed('pack-node-hover', hover);
        }
    };

    _bodyG.selectAll('g.pack-node')
        .data(nodes)
        .transition()
        .attr('transform', (d) => {
            return `translate(${d.x},${d.y})`;
        })
        .select('circle')
        .attr('id', (d) => {
            return `node-${d.id}`;
        })
        .attr('r', (d) => {
            return d.r;
        })
        .attr('stroke', 'none')
        .attr('fill', (d) => {
            console.log('@@@depth', d.depth);
            return _colors(d.depth);
        });

    // 添加text
    const leafs = packEnters.filter((d) => {
        return !d.children;
    })
    leafs.append('clipPath')
        .attr('id', (d) => {
            return `clip-${d.id}`;
        })
        .append('use')
        .attr('xlink:href', (d) => {
            return `#node-${d.id}`;
        })
    leafs.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', '#000')
        .attr('clip-path', (d) => {
            return `url(#clip-${d.id})`;
        })
        .selectAll('tspan')
        .data(function (d) {
            return [d.id];
        })
        .enter()
        .append('tspan')
        .text((d) => {
            return d;
        })

    _bodyG.selectAll('g.pack-node')
        .data(nodes)
        .exit().remove();

    // title
    packEnters.append('title')
        .text((d) => {
            return `${d.id}\n${d3.format(',d')(d.value)}`
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

        _chart.render = () => {
            if (!_svg) {
                _svg = d3.select(el).append('svg')
                    .attr('height', options.height)
                    .attr('width', options.width);
            }
            _bodyG = _chart.renderBody(_svg, _bodyG, _chart);
            renderPack(_bodyG, options, _chart)
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
export function pack (el, options, data) {
    options = options || {};
    options.renderer = options.renderer || 'svg';

    renderer[options.renderer](el, options, data);
};