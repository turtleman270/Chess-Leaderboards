import Highcharts from 'highcharts';

export function createChart(ruleset, chartData) {
  Highcharts.chart(ruleset, {
    chart: {
        zoomType: 'y',
        type: 'column'
    },
    title: {
        text: 'Players'
    },
    subtitle: {
        text: 'These are people who play chess'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
          text: 'Elo Rating'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.0f}'
            }
        }
    },

    series: [
        {
            name: "Players",
            colorByPoint: true,
            data: chartData
        }
    ]
  });
}
