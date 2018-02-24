
import { column } from './column';
import { pie } from './pie';

import { translate } from './optionUtils';

const utils = {
    column,
    pie
};

export default function (el, options) {
    const data = translate.data(options.type, options);
    utils[options.type](el, options, data);
}