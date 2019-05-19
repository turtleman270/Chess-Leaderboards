<template>
  <div class="col">
    <div :id="ruleset + '-bar'" style="min-width: 310px; height: 400px;"></div>
    <div :id="ruleset + '-line'" style="min-width: 310px; height: 400px;"></div>
  </div>
</template>

<script>
  import { calculateAllElo, calculateEloOverTime } from '../lib/eloCalculator';
  import { createBarChart, createLineChart } from '../lib/charts';

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

          this.infos = Object.keys(allElo)
            .map(person => ({ person, elo: allElo[person] }))
            .sort((a, b) => b.elo - a.elo);

          const allEloData = Object.keys(allElo)
            .map(person => ({ person, elo: allElo[person] }))
            .sort((a, b) => b.elo - a.elo)
            .map(({ person, elo }) => ({
              name: person,
              y: elo
            }
          ));

          createBarChart(this.ruleset, allEloData);

          const eloOverTime = calculateEloOverTime(txt);

          const eloOverTimeData = Object.keys(eloOverTime)
            .map(person => ({ person, elo: eloOverTime[person] }))
            .map(({ person, elo }) => ({
              name: person,
              data: elo
            }
          ));

          createLineChart(this.ruleset, eloOverTimeData);
        });
      }
  }
</script>
