import * as d3 from 'd3';
/**
 * 选项转换器
 */
const translateUtil = {
};

const translateData = {
    column (data) {
        const categoryData = data.xAxis.data;
        const valueData = data.series[0].data;

        const result = [];

        categoryData.forEach((c, index) => {
            const r = {};
            r.name = c;
            r.value = valueData[index];
            result.push(r);
        });

        return result;
    },
    pie (data) {
        const valueData = data.series[0].data;
        const sum = d3.sum(valueData);

        const fullAngle = 2 * Math.PI;
        const endAngle = data.endAngle || fullAngle;

        const result = [];
        let preAngle = 0;
        valueData.forEach((d, index) => {
            const angle = d / sum * endAngle;
            result.push({
                startAngle: preAngle,
                endAngle: preAngle + angle
            });
            preAngle += angle;
        });

        return result;
    },
    line (data) {
        const categoryData = data.xAxis.data;
        const series = data.series;

        const result = [];

        categoryData.forEach((c, index) => {
            series.forEach((d, innerIndex) => {
                const data = d.data;
                if (!result[innerIndex]) {
                    result[innerIndex] = [];
                }
                const r = {};
                r.name = c;
                r.value = data[index];
                result[innerIndex].push(r);
            });
        });

        return result;
    },
    area (data) {
        if (data.stack) {
            const categoryData = data.xAxis.data;
            const series = data.series;

            const parseData = [];

            categoryData.forEach((d, i) => {
                const item = {};
                item.key = d;
                series.forEach((sd, innerIndex) => {
                    const data = sd.data;
                    item[sd.name] = data[i];
                })
                parseData.push(item);
            });

            const keys = [];
            series.forEach((sd, innerIndex) => {
                keys.push(sd.name);
            })

            if (typeof data.stack !== 'object') {
                data.stack = {};
            }
            data.stack.data = parseData;
            data.stack.keys = keys;
        }

        return translateData.line(data);
    },
    bubble (data) {
        return translateData.line(data);
    },
    scatterplot (data) {
        return translateData.line(data);
    }
};

/**
  * 数据转换
  */
translateUtil.data = (type, data) => {
    if (translateData[type]) {
        return translateData[type](data);
    } else {
        return null;
    }
};

export const translate = translateUtil;