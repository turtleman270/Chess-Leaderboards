function calculateEloChange(winner, loser) {
  return 20/(1+Math.pow(10,((winner-loser)/400)));
}

export function eloCalc(white, black, outcome){
  let change;
  if(outcome=="black"){
    change = calculateEloChange(black, white);
    return [white-change, black+change];
  }
  if(outcome=="white"){
    change = calculateEloChange(white, black);
    return [white+change, black-change]
  }
  if(outcome=="tie"){
    if(white==black){
      return[white, black]
    }
    const e1 = calculateEloChange(white, black);
    const e2 = calculateEloChange(black, white);
    const expected = (Math.max(e1,e2) - Math.min(e1,e2))/2;

    if(white>black){
      return [white-expected, black+expected]
    }
    if(white<black){
      return [white+expected, black-expected]
    }
  }

  throw new Error("Error calculating elo. Check that your outcome is one of white, black, or tie.");
}

export function calculateAllElo(txt) {
  return txt.trim().split("\n").slice(1)
    .reduce(
      (people, line) => {
        const [white, black, outcome] = line.split(",");
        const result = eloCalc(
          people[white] || 1000,
          people[black] || 1000,
          outcome
        );
        people[white] = result[0];
        people[black] = result[1];
        return people;
      },
      {}
    );
}


export function calculateEloOverTime(txt) {
  var currentElo = []
  return txt.trim().split("\n").slice(1)
    .reduce(
      (elosAllTime, line) => {
        const [white, black, outcome, year, month, day] = line.split(",");
        const result = eloCalc(
          currentElo[white] || 1000,
          currentElo[black] || 1000,
          outcome
        );
        currentElo[white] = result[0];
        currentElo[black] = result[1];
        elosAllTime[white] = elosAllTime[white] || [];
        elosAllTime[black] = elosAllTime[black] || [];
        elosAllTime[white].push([Date.UTC(year, month, day),result[0]]);
        elosAllTime[black].push([Date.UTC(year, month, day),result[1]]);
        return elosAllTime;
      },
      {}
    );
}
