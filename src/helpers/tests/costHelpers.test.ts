import { describe, expect, it } from 'vitest';
import { getUpgradeCost } from '../costHelpers';
import { newAlgorithmCost } from '../costHelpers';
import { bandwidthReplenishmentCost } from '../costHelpers';
import { GameState } from '../../types';

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
  const mockedConfig = {
    algorithmCostBase: 6,
    algorithmCostRateGrowth: 1.07,
    executablesCostBase: 10000,
    processingCoreProductionBase: 1.2 / 750,
    dataProductionBase: 1691 / 100,
  };

  it('returns 6', () => {
    expect(newAlgorithmCost(0, mockedConfig)).toBe(6);
  });

  it('returns 7', () => {
    expect(newAlgorithmCost(1, mockedConfig)).toBe(7);
  });

  it('returns 65', () => {
    expect(newAlgorithmCost(35, mockedConfig)).toBe(65);
  });

  it('returns 784', () => {
    expect(newAlgorithmCost(72, mockedConfig)).toBe(784);
  });

  it('returns 26409', () => {
    expect(newAlgorithmCost(124, mockedConfig)).toBe(26409);
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
