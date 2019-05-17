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
        const people = {};
        const rawFile = txt.split("\n");
        for (var i = 1; i < rawFile.length-1; i++) {
          line = rawFile[i];
          match = line.split(",");
          white = match[0];
          black = match[1];
          outcome = match[2];
          //add people to array if needed
          if (!(white in people)){
            people[white] = 1000;
          }
          if (!(black in people)){
            people[black] = 1000;
          }
          result = eloCalc(people[white],people[black],outcome)
          people[white] = result[0]
          people[black] = result[1]
        }

        this.infos = Object.keys(people)
          .map(person => ({ person, elo: people[person] }))
          .sort((a, b) => b.elo - a.elo);
        chartData = []
        for(info in this.infos){
        var player = {
          name: this.infos[info].person,
          y: this.infos[info].elo
        };
        chartData.push(player)
        }
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
