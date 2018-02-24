
import { column } from './column';
import { pie } from './pie';

import { translate } from './optionUtils';

import Vue from 'vue';
if (!Vue.$isServer) {
    import('../skin/default.less');
}
const utils = {
    column,
    pie
};

export default function (el, options) {
    const data = translate.data(options.type, options);
    utils[options.type](el, options, data);
}