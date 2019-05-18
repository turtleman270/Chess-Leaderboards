import { expect } from 'chai';
import { eloCalc } from '../../../src/lib/eloCalculator';

describe('calculate elo', function () {

  it('same elo tie no change', function () {
    expect(eloCalc(1000,1000,"tie")).to.eql([1000,1000]);
	});
  it('different elo tie has change', function () {
    expect(eloCalc(1300,1500,"tie")).to.eql([1305.194938532959156,
      1494.8050614670408]);
	});

  it('white wins both 1k', function () {
    expect(eloCalc(1000,1000,"white")).to.eql([1010,990]);
	});
  it('black wins both 1k', function () {
    expect(eloCalc(1000,1000,"black")).to.eql([990,1010]);
	});
  it('1000 v 1111 white wins', function () {
    expect(eloCalc(1000,1111,"white")).to.eql([1013.090399887649319,
    1097.9096001123507]);
  });
  it('1000 v 1111 black wins', function () {
    expect(eloCalc(1000,1111,"black")).to.eql([993.0903998876494,
    1117.9096001123507]);
  });


});
