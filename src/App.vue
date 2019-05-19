<template>
  <div class="container" id="app">
    <h1 class="display-1">Chess Ladder</h1>
    <div class="row">
      <leaderboard ruleset="ruleset1"></leaderboard>
      <leaderboard ruleset="ruleset2"></leaderboard>
      <leaderboard ruleset="ruleset3"></leaderboard>
    </div>
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
