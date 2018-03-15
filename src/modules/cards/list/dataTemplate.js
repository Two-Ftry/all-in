
export default {
    data () {
        return {
            chartsData: [
                {
                    type: 'column',
                    // colors: ['green'],
                    renderer: 'svg',
                    xAxis: {
                        type: 'category',
                        name: 'letter',
                        data: ['A', 'B', 'C', 'D', 'E', 'F', 'H']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'A',
                            type: 'column',
                            data: [1, 2, 3, 4, 5, 9, 26]
                        }
                    ]
                },
                {
                    type: 'pie',
                    endAngle: 2 * Math.PI,
                    renderer: 'svg',
                    innerRadius: '0',
                    padAngle: 0,
                    series: [
                        {
                            name: 'my pie',
                            type: 'pie',
                            data: [44, 5, 6, 9, 4, 9, 33, 12]
                        }
                    ]
                },
                {
                    type: 'line',
                    renderer: 'svg',
                    xAxis: {
                        type: 'category',
                        name: 'letter',
                        data: ['A', 'B', 'C', 'D', 'E', 'F', 'H']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'A',
                            type: 'column',
                            data: [1, 2, 3, 4, 5, 9, 26]
                        },
                        {
                            name: 'B',
                            type: 'column',
                            data: [3, 55, 3, 6, 69, 90, 6]
                        }
                    ]
                },
                {
                    type: 'area',
                    renderer: 'svg',
                    xAxis: {
                        type: 'category',
                        name: 'letter',
                        data: ['A', 'B', 'C', 'D', 'E', 'F', 'H']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    stack: false,
                    series: [
                        {
                            name: '清风',
                            type: 'column',
                            data: [1, 2, 3, 4, 5, 9, 26]
                        },
                        {
                            name: '浮云',
                            type: 'column',
                            data: [3, 55, 3, 6, 69, 90, 6]
                        }
                    ]
                },
                {
                    type: 'scatterplot',
                    renderer: 'svg',
                    xAxis: {
                        type: 'category',
                        name: 'letter',
                        data: ['A', 'B', 'C', 'D', 'E', 'F', 'H']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    stack: false,
                    series: [
                        {
                            name: '清风',
                            type: 'column',
                            data: [1, 2, 3, 4, 5, 9, 26]
                        },
                        {
                            name: '浮云',
                            type: 'column',
                            data: [3, 55, 3, 6, 69, 90, 6]
                        },
                        {
                            name: '浮云2',
                            type: 'column',
                            data: [97, 7, 30, 60, 7, 89, 103]
                        }
                    ]
                }
            ]
        }
    }
}