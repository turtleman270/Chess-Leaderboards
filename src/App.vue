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

  const defaultRulesets = '5 Minutes + 5 Seconds,data/5 min + 5 sec.txt;5 Minutes + 0 Seconds,data/5 min.txt;15 Minutes + 10 Seconds,data/15 min + 10 sec.txt';

  export default {
    name: 'app',
    components: {
      Leaderboard
    },
    data: function() {
      return {
        rulesets: (process.env.VUE_APP_RULESETS || defaultRulesets)
          .split(';')
          .map(pair => {
            const [title, source] = pair.split(',');
            return { title, source };
          })
      };
    }
  }
</script>
