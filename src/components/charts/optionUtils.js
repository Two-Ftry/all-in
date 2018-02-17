/**
 * 选项转换器
 */
const translateUtil = { 
};

const translateData = {
    column (data) {
        const categoryData = data.xAxis.data;
        const valueData = data.series[0].data;
        const xName = data.xAxis.name;
        const yName = data.series[0].name;

        const result = [];

        categoryData.forEach((c, index) => {
            const r = {};
            r.name = c;
            r.value = valueData[index];
            result.push(r);
        });

        return result;
    }
};

 /**
  * 数据转换
  */
translateUtil.data = (type, data) => {
    return translateData[type](data);
};

 export const translate = translateUtil;