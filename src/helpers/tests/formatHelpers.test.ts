import { formatData } from '../formatHelpers';
import { formatTimeElapsed } from '../formatHelpers';

describe('#formatData', () => {
  it('returns string: 100 B when data is 100', () => {
    expect(formatData(100)).toBe('100 B');
  });

  it('returns string: 1 KB when data is 1024', () => {
    expect(formatData(1024)).toBe('1.00 KB');
  });

  it('returns string: 2.46 MB when data is 2580000', () => {
    expect(formatData(2580000)).toBe('2.46 MB');
  });

  it('returns string: 5.00 GB when data is 5370000000', () => {
    expect(formatData(5370000000)).toBe('5.00 GB');
  });

  it('returns string: 1.00 TB when data is 1100000000000', () => {
    expect(formatData(1100000000000)).toBe('1.00 TB');
  });
});

describe('#formatTimeElapsed', () => {
  it('returns seconds in format: 00:00:01.00 ', () => {
    expect(formatTimeElapsed(1)).toBe('00:00:01.00');
  });

  it('returns seconds in format: 00:01:00.00 ', () => {
    expect(formatTimeElapsed(60)).toBe('00:01:00.00');
  });

  it('returns seconds in format: 00:10:00.00 ', () => {
    expect(formatTimeElapsed(600)).toBe('00:10:00.00');
  });

  it('returns seconds in duration format: 00:20:00.00 ', () => {
    expect(formatTimeElapsed(1200)).toBe('00:20:00.00');
  });
});
