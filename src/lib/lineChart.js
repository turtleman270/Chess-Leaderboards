import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';

// Initialize exporting module.
Exporting(Highcharts);
ExportData(Highcharts);

export function createChart(ruleset, chartData) {

  Highcharts.chart(ruleset, {
    chart: {
        zoomType: 'x',
        type: 'line',
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
      type: 'datetime',
      title: {
          text: 'Date'
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
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: false
            }
        }
    },

    series: chartData,

    exporting: {
        showTable: false,
        tableCaption: false
    }
  });
}
