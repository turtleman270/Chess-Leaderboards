<template>
  <div class="col">
    <div :id="ruleset" style="min-width: 310px; height: 400px;"></div>
  </div>
</template>

<script>
  import { calculateAllElo } from '../lib/eloCalculator';
  import { calculateEloOverTime } from '../lib/eloCalculator';
  import { createChart } from '../lib/lineChart';

  export default {
    name: 'EloOverTime',
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
          const people = calculateEloOverTime(txt);
          this.infos = Object.keys(people)
            .map(person => ({ person, elo: people[person] }));

          const chartData = this.infos.map(({ person, elo }) => ({
            name: person,
            data: elo
          }));
          console.log(chartData)

          createChart(this.ruleset, chartData);
        });
      }
  }
</script>
