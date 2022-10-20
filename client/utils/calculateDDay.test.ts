import calculateDDay from './calculateDDay';
import { expect, it } from '../node_modules/vitest/dist/index.js';

function dateObjectToString(date: Date): string {
  const year = '' + date.getFullYear();
  const temporaryMonth = date.getMonth() + 1;
  const month = temporaryMonth < 10 ? '0' + temporaryMonth : '' + temporaryMonth;
  const temporaryPureDate = date.getDate();
  const pureDate =
    temporaryPureDate < 10 ? '0' + temporaryPureDate : '' + temporaryPureDate;

  return `${year}-${month}-${pureDate}`;
}

it('이전 날짜에 "+"로 적용되는지 확인하기', () => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const yesterdayString = dateObjectToString(yesterday);
  const result = calculateDDay(yesterdayString);
  expect(result).toBe('D+1');
});

it('당일에 "D-Day"로 적용되는지 확인하기', () => {
  const today = new Date();
  const todayString = dateObjectToString(today);
  const result = calculateDDay(todayString);
  expect(result).toBe('D-Day');
});

it('이후 날짜에 "-"로 적용되는지 확인하기', () => {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const tomorrowString = dateObjectToString(tomorrow);
  const result = calculateDDay(tomorrowString);
  expect(result).toBe('D-1');
});
