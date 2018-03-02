
import { renderer } from './renderer';

/**
 * 创建条形图
 * @param {*} el
 * @param {*} options
 */
export function area (el, options, data) {
    options = options || {};
    options.renderer = options.renderer || 'svg';

    renderer.area(el, options, data);
};