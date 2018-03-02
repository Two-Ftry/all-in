
export default {
    data () {
        return {
            chartsData: [
                {
                    type: 'column',
                    color: 'green',
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
                    series: [
                        {
                            name: 'A',
                            type: 'column',
                            data: [1, 2, 3, 4, 5, 9, 26]
                        }
                    ]
                }
            ]
        }
    }
}