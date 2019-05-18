<template>
  <div class="col">
    <div :id="ruleset" style="min-width: 310px; height: 400px;"></div>
  </div>
</template>

<script>
  import { calculateAllElo } from '../lib/eloCalculator';
  import { createChart } from '../lib/chart';

  export default {
    name: 'Leaderboard',
    props: {
      ruleset: String
    },
    data: function() {
      return {
        infos: []
      }
    },
    mounted: function() {
      fetch(`data/${this.ruleset}.txt`)
        .then(response => response.text())
        .then(txt => {
          const people = calculateAllElo(txt);

          this.infos = Object.keys(people)
            .map(person => ({ person, elo: people[person] }))
            .sort((a, b) => b.elo - a.elo);

          const chartData = this.infos.map(({ person, elo }) => ({
            name: person,
            y: elo
          }));

          createChart(this.ruleset, chartData);
        });
      }
  }
</script>
