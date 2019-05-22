import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
import Accessibility from 'highcharts/modules/accessibility';

// Initialize exporting module.
Exporting(Highcharts);
ExportData(Highcharts);
Accessibility(Highcharts);

export function createLineChartData(eloOverTime) {
  return Object.keys(eloOverTime)
    .map(person => ({ person, elo: eloOverTime[person] }))
    .map(({ person, elo }) => ({
      name: person,
      data: elo
    }
  ));
}

export function createLineChart(ruleset, chartData) {

  Highcharts.chart(`${ruleset}-line`, {
    chart: {
        zoomType: 'x',
        type: 'line',
        borderWidth: 1,
        borderColor: '#ccc',
        spacingBottom: 30
    },
    accessibility: {
      description: 'Line graph showing how players elos fluctuate over time.'
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
