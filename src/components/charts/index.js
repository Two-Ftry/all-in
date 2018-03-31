
import { column } from './column';
import { pie } from './pie';
import { line } from './line';
import { area } from './area';
import { bubble } from './bubble';
import { scatterplot } from './scatterplot';
import { treemap } from './treemap';
import { tree } from './tree';

import { translate } from './optionUtils';

import Vue from 'vue';
if (!Vue.$isServer) {
    import('../skin/default.less');
}
const utils = {
    column,
    pie,
    line,
    area,
    bubble,
    scatterplot,
    treemap,
    tree
};

export default function (el, options) {
    const data = translate.data(options.type, options);
    utils[options.type](el, options, data);
}