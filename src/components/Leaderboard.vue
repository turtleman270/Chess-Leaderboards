<template>
  <div>
    <div :id="title + '-line'" style="min-width: 310px; height: 400px;"></div>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Elo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({ person, elo }, rank) in infos" :key="rank">
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
  var CONFIG = require('../../configs.json');
  const startingElo = CONFIG.startingElo;
  const decimalPlaces = CONFIG.decimalPlaces;

  export default {
    name: 'Leaderboard',
    props: {
      source: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    data: function() {
      return {
        infos: []
      }
    },
    mounted: function() {
      fetch(this.source)
        .then(response => response.text())
        .then(txt => {
          const people = calculateAllElo(txt, startingElo);
          this.infos = Object.keys(people)
            .map(person => ({ person, elo: people[person].toFixed(decimalPlaces) }))
            .sort((a, b) => b.elo - a.elo);

          const eloOverTime = calculateEloOverTime(txt, startingElo);
          const eloOverTimeData = createLineChartData(eloOverTime)
          createLineChart(this.title, eloOverTimeData);
        });
      }
  }
</script>
