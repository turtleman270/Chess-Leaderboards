<template>
  <div class="container" id="app">
    <h1 class="display-1">Chess Ladder</h1>
    <vue-tabs>
      <v-tab v-for="({ title, source }, i) in rulesets" :key="i" :title="title">
        <leaderboard :title="title" :source="source"/>
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
  import Leaderboard from './components/Leaderboard';
  var CONFIG = require('../configs.json');

  const folder = CONFIG.dataFolder;
  const files = CONFIG.filePaths;

  export default {
    name: 'app',
    components: {
      Leaderboard
    },
    data: function() {
      return {
        rulesets: files
          .split(',')
          .map(ruleset => {
            const [title, source] = [ruleset.split('.')[0], folder+ruleset];
            return { title, source };
          })
      };
    }
  }
</script>
