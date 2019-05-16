function eloCalc(elo1, elo2, result){
  expected = (1/(1+Math.pow(10,((elo1-elo2)/400))))
  if(result){
    expected-=0.5;
  }
  expected*=20;
  return expected;
}
module.exports = eloCalc;
