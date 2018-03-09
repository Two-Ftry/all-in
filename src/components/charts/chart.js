/**
 * 图表类
 */
import { coordinate } from './coordinate'
class BaseChart {
    constructor (options) {
        this.coordinate = coordinate(options); // 坐标
        this._x = null; // x轴尺度
        this._y = null; // y轴尺度
    }
    render () {
    }
    // 设置x轴比例尺
    x (x) {
        if (!arguments.length) {
            return this._x;
        }
        this._x = x;
        return this;
    }

    // 设置y轴比例尺
    y (y) {
        if (!arguments.length) {
            return this._y;
        }
        this._y = y;
        return this;
    }
    // 创建坐标轴
    renderAxes (svg) {
        this.coordinate.renderAxes(svg, this._x, this._y);
    }
    // 创建画布主体
    renderBody (svg, bodyG) {
        return this.coordinate.renderBody(svg, bodyG)
    }
}

export default BaseChart;