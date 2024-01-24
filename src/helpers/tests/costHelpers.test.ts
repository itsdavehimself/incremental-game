import { getUpgradeCost } from '../costHelpers';
import { newAlgorithmCost } from '../costHelpers';
import { bandwidthReplenishmentCost } from '../costHelpers';
import { GameState } from '../../types';
import config from '../../data/config';

describe('#getUpgradeCost', () => {
  const mockedCostBreakdown = [
    { currency: 'Cognitum', amount: 25 },
    { currency: 'Nodes', amount: 1000 },
    { currency: 'Processing Cores', amount: 100000 },
    { currency: 'Fractional Memory Cores', amount: 2.5 },
  ];

  it('returns 25', () => {
    expect(getUpgradeCost('Cognitum', mockedCostBreakdown)).toBe(25);
  });

  it('returns 1000', () => {
    expect(getUpgradeCost('Nodes', mockedCostBreakdown)).toBe(1000);
  });

  it('returns 100000', () => {
    expect(getUpgradeCost('Processing Cores', mockedCostBreakdown)).toBe(
      100000,
    );
  });

  it('returns 2.5', () => {
    expect(getUpgradeCost('Fractional Memory Cores', mockedCostBreakdown)).toBe(
      2.5,
    );
  });
});

describe('#newAlgorithmCost', () => {
  it('returns 6 when current number of algorithms is 0', () => {
    expect(newAlgorithmCost(0, config)).toBe(6);
  });

  it('returns 7 when current number of algorithms is 1', () => {
    expect(newAlgorithmCost(1, config)).toBe(7);
  });

  it('returns 65 when current number of algorithms is 65', () => {
    expect(newAlgorithmCost(35, config)).toBe(65);
  });

  it('returns 784 when current number of algorithms is 72', () => {
    expect(newAlgorithmCost(72, config)).toBe(784);
  });

  it('returns 26409 when current number of algorithms is 124', () => {
    expect(newAlgorithmCost(124, config)).toBe(26409);
  });
});

describe('#bandwidthReplenishmentCost', () => {
  const createPartialMock = (bandwidthIndex: number): Partial<GameState> => ({
    bandwidthIndex,
  });

  const zeroIndexMock = createPartialMock(0);
  const twoIndexMock = createPartialMock(2);
  const threeIndexMock = createPartialMock(3);

  it('returns 50', () => {
    expect(bandwidthReplenishmentCost(zeroIndexMock as GameState)).toBe(50);
  });

  it('returns 100', () => {
    expect(bandwidthReplenishmentCost(twoIndexMock as GameState)).toBe(100);
  });

  it('returns 150', () => {
    expect(bandwidthReplenishmentCost(threeIndexMock as GameState)).toBe(150);
  });
});
