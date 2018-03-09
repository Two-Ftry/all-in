/**
 * 坐标轴工具类
 */
import * as d3 from 'd3';

class Coordinate {
    options = null;
    constructor (options) {
        this.options = options;
    }
    xStart () {
        return this.options.margins.left;
    }
    yStart () {
        const options = this.options;
        return options.height - options.margins.bottom;
    }
    xEnd () {
        const options = this.options;
        return options.width - options.margins.right;
    }
    yEnd () {
        const options = this.options;
        return options.margins.top;
    }

    quadrantWidth () {
        const options = this.options;
        return options.width - options.margins.left - options.margins.right;
    }

    quadrantHeight () {
        const options = this.options;
        return options.height - options.margins.top - options.margins.bottom;
    }

    // 创建坐标系
    renderAxes (svg, _x, _y) {
        const axesG = svg.append('g')
            .attr('class', 'axes');

        this.renderXAxis(axesG, _x);
        this.renderYAxis(axesG, _y);
    }

    // 创建x轴
    renderXAxis (axesG, _x) {
        const xAxis = d3.axisBottom(_x);
        axesG.append('g')
            .attr('transform', `translate(${this.xStart()},${this.yStart()})`)
            .call(xAxis);
    }

    // 创建y轴
    renderYAxis (axesG, _y) {
        const yAxis = d3.axisLeft(_y);
        axesG.append('g')
            .attr('transform', `translate(${this.xStart()},${this.yEnd()})`)
            .call(yAxis);
    }

    // 定义svg的可绘制区域
    defineBodyClip (svg) {
        const padding = 5;
        svg.append('defs')
            .append('clipPath')
            .attr('class', 'body-clip')
            .append('rect')
            .attr('x', 0 - padding)
            .attr('y', 0)
            .attr('width', this.quadrantWidth() + 2 * padding)
            .attr('height', this.quadrantHeight());
    }

    // 创建绘图主体
    renderBody (svg, _bodyG) {
        if (!_bodyG) {
            _bodyG = svg.append('g')
                .attr('class', 'body')
                .attr('transform', 'translate(' +
                this.xStart() + ',' +
                this.yEnd() + ')');
        }
        return _bodyG;
    }
}

export const coordinate = (options) => {
    return new Coordinate(options);
}