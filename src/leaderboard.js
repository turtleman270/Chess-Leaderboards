Vue.component('leaderboard', {
  props: ['ruleset'],
  data: function() {
    return {
      infos: []
    }
  },
  template: `
    <div class="col">
      <h2>{{ ruleset }}</h2>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Elo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="({ person, elo }, rank) in infos">
            <td>{{ rank + 1 }}</td>
            <td>{{ person }}</td>
            <td>{{ elo }}</td>
          </tr>
        </tbody>
      </table>
      <div :id="ruleset" style="min-width: 310px; height: 400px;"></div>

    </div>`,
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
});
