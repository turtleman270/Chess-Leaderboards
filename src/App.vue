<template>
  <div class="container" id="app">
    <h1 class="display-1">Chess Ladder</h1>
    <div class="row">
      <leaderboard ruleset="ruleset1"></leaderboard>
      <leaderboard ruleset="ruleset2"></leaderboard>
      <leaderboard ruleset="ruleset3"></leaderboard>
      <eloOverTime ruleset="withDate"></eloOverTime>

    </div>
  </div>
</template>

<script>
  import Leaderboard from './components/Leaderboard';
  import EloOverTime from './components/EloOverTime';
  export default {
    name: 'app',
    components: {
      Leaderboard,
      EloOverTime
    }
  }
</script>
