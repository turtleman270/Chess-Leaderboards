<template>
  <div class="container" id="app">
    <h1 class="display-1">Chess Ladder</h1>
    <vue-tabs>
      <v-tab title="ruleset1 tab">
        <leaderboard ruleset="ruleset1"></leaderboard>
      </v-tab>
      <v-tab title="ruleset2 tab">
        <leaderboard ruleset="ruleset2"></leaderboard>
      </v-tab>
      <v-tab title="ruleset3 tab">
        <leaderboard ruleset="ruleset3"></leaderboard>
      </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
  import Leaderboard from './components/Leaderboard';
  export default {
    name: 'app',
    components: {
      Leaderboard
    }
  }
</script>
