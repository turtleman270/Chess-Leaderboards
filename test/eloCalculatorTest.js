const expect = require('chai').expect;
var eloCalc = require('../src/eloCalculator.js');
describe('calculate elo', function () {

  it('same elo tie no change', function () {
    expect(eloCalc(1000,1000,"tie")).to.be.equal(0);
	});
  it('different elo tie has change', function () {
    expect(eloCalc(1300,1500,"tie")).to.be.equal(5.194938532959156);
	});
  it('1k v 1k change of 10', function () {
    expect(eloCalc(1000,1000)).to.be.equal(10);
	});
  it('1000 v 1111 change of 13', function () {
    expect(eloCalc(1000,1111)).to.be.equal(13.090399887649319);
  });
  it('1111 v 1000 change of 13', function () {
    expect(eloCalc(1000,1111)).to.be.equal(13.090399887649319);
  });


});
