<template>
  <div class="col">
    <div :id="ruleset + '-bar'" style="min-width: 310px; height: 400px;"></div>
    <div :id="ruleset + '-line'" style="min-width: 310px; height: 400px;"></div>
  </div>
</template>

<script>
  import { calculateAllElo, calculateEloOverTime } from '../lib/eloCalculator';
  import {
    createBarChartData,
    createBarChart,
    createLineChartData,
    createLineChart
  } from '../lib/charts';

  export default {
    name: 'Leaderboard',
    props: {
      ruleset: String
    },
    data: function() {
      return {}
    },
    mounted: function() {
      fetch(`data/${this.ruleset}.txt`)
        .then(response => response.text())
        .then(txt => {
          const allElo = calculateAllElo(txt);
          const allEloData = createBarChartData(allElo);
          createBarChart(this.ruleset, allEloData);

          const eloOverTime = calculateEloOverTime(txt);
          const eloOverTimeData = createLineChartData(eloOverTime)
          createLineChart(this.ruleset, eloOverTimeData);
        });
      }
  }
</script>
