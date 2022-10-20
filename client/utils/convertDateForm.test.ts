import { toDisplay, toStandard } from './convertDateForm';
import { expect, it, describe } from '../node_modules/vitest/dist/index.js';

describe('toDisplay, 2022-10-20을 2022년 10월 20일로', () => {
  it('"월"과 "일"이 두 자리 숫자인 경우', () => {
    const before = '2022-10-20';
    const after = toDisplay(before);
    const expected = '2022년 10월 20일';
    expect(after).toBe(expected);
  });

  it('"월"과 "일"이 한 자리 숫자인 경우', () => {
    const before = '2022-01-02';
    const after = toDisplay(before);
    const expected = '2022년 1월 2일';
    expect(after).toBe(expected);
  });
});

describe('toStandard, 2022년 10월 20일을 2022-10-20으로', () => {
  it('"월"과 "일"이 두 자리 숫자인 경우', () => {
    const before = '2022년 10월 20일';
    const after = toStandard(before);
    const expected = '2022-10-20';
    expect(after).toBe(expected);
  });

  it('"월"과 "일"이 한 자리 숫자인 경우', () => {
    const before = '2022년 1월 2일';
    const after = toStandard(before);
    const expected = '2022-01-02';
    expect(after).toBe(expected);
  });
});
