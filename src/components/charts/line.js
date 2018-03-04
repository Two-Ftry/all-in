
import renderer from './renderer';

/**
 * 创建条形图
 * @param {*} el
 * @param {*} options
 */
export function line (el, options, data) {
    options = options || {};
    options.renderer = options.renderer || 'svg';

    renderer.line(el, options, data);
};