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

module.exports = {
  eloCalc
};
