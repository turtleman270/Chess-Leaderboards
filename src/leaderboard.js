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
  mounted: function(c) {
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

        Highcharts.chart(`${this.ruleset}`, {
          chart: {
              zoomType: 'y',
              type: 'column'
          },
          title: {
              text: 'Players'
          },
          subtitle: {
              text: 'These are people who play chess'
          },
          xAxis: {
              type: 'category'
          },
          yAxis: {
              title: {
                  text: 'Elo Rating'
              }

          },
          legend: {
              enabled: false
          },
          plotOptions: {
              series: {
                  borderWidth: 0,
                  dataLabels: {
                      enabled: true,
                      format: '{point.y:.0f}'
                  }
              }
          },

          series: [
              {
                  name: "Players",
                  colorByPoint: true,
                  data: chartData
              }
          ]
        });


      });
    }
});
