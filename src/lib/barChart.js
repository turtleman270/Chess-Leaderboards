import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';

// Initialize exporting module.
Exporting(Highcharts);
ExportData(Highcharts);

export function createChart(ruleset, chartData) {
  Highcharts.chart(ruleset, {
    chart: {
        zoomType: 'y',
        type: 'column',
        borderWidth: 1,
        borderColor: '#ccc',
        spacingBottom: 30
    },
    title: {
        text: ruleset
    },
    subtitle: {
        text: 'These are people who play chess'
    },
    xAxis: {
        type: 'category',
        title:{
          text: 'Name'
        }
    },
    yAxis: {
        title: {
          text: 'Elo Rating'
        }

    },
    tooltip: {
      valueDecimals: 1
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
            name: "Elo rating",
            colorByPoint: true,
            data: chartData
        }
    ],

    exporting: {
        showTable: true,
        tableCaption: false
    }
  });
}
