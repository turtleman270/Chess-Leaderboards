<template>
  <div class="col">
    <div :id="ruleset + '-line'" style="min-width: 310px; height: 400px;"></div>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Elo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({ person, elo }, rank) in infos" :key="person">
          <td>{{ rank + 1 }}. {{ person }}</td>
          <td>{{ elo }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import { calculateAllElo, calculateEloOverTime } from '../lib/eloCalculator';
  import {
    createLineChartData,
    createLineChart
  } from '../lib/charts';

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
            .map(person => ({ person, elo: people[person].toFixed(1) }))
            .sort((a, b) => b.elo - a.elo);

          const eloOverTime = calculateEloOverTime(txt);
          const eloOverTimeData = createLineChartData(eloOverTime)
          createLineChart(this.ruleset, eloOverTimeData);
        });
      }
  }
</script>
