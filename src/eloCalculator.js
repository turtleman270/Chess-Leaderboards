function calculateEloChange(winner, loser) {
  return 20/(1+Math.pow(10,((winner-loser)/400)));
}

function eloCalc(white, black, outcome){
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
    e1 = calculateEloChange(white, black);
    e2 = calculateEloChange(black, white);
    expected = Math.max(e1,e2) - Math.min(e1,e2);
    expected /= 2;

    if(white>black){
      return [white-expected, black+expected]
    }
    if(white<black){
      return [white+expected, black-expected]
    }
  }

  throw new Error("Well something went wrong....");
}

function calculateAllElo(txt) {
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

module.exports = {
  eloCalc,
  calculateAllElo
};
