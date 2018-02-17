
import { column } from './column';
import { translate } from './optionUtils';

const utils = {
    column
};


export default function (el, options) {
    const data = translate.data(options.type, options);
    utils[options.type](el, options, data);
}