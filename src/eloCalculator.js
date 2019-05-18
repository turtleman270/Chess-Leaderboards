function eloCalc(white, black, outcome){
  if(outcome=="black"){
    change = 20/(1+Math.pow(10,((black-white)/400)))
    return [white-change, black+change];
  }
  if(outcome=="white"){
    change = 20/(1+Math.pow(10,((white-black)/400)))
    return [white+change, black-change]
  }
  if(outcome=="tie"){
    if(white==black){
      return[white, black]
    }
    e1 = 20/(1+Math.pow(10,((white-black)/400)))
    e2 = 20/(1+Math.pow(10,((black-white)/400)))
    expected = Math.max(e1,e2) - Math.min(e1,e2);
    expected /= 2;

    if(white>black){
      return [white-expected, black+expected]
    }
    if(white<black){
        return [white+expected, black-expected]
    }
  }
  return "Well something went wrong...."
}

function calculateAllElo(txt) {
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

  return people;
}

module.exports = {
  eloCalc,
  calculateAllElo
};
