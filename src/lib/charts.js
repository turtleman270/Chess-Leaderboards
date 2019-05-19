import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
import Accessibility from 'highcharts/modules/accessibility';

// Initialize exporting module.
Exporting(Highcharts);
ExportData(Highcharts);
Accessibility(Highcharts);

export function createBarChartData(allElo) {
  return Object.keys(allElo)
    .map(person => ({ person, elo: allElo[person] }))
    .sort((a, b) => b.elo - a.elo)
    .map(({ person, elo }) => ({
      name: person,
      y: elo
    }
  ));
}

export function createBarChart(ruleset, chartData) {
  Highcharts.chart(`${ruleset}-bar`, {
    chart: {
        zoomType: 'y',
        type: 'column',
        borderWidth: 1,
        borderColor: '#ccc',
        spacingBottom: 30
    },
    accessibility: {
      description: 'Bar graph showing players current elo scores.'
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
        showTable: false,
        tableCaption: false
    }
  });
}

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
