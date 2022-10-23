import { getCount, getData, postData, putData, deleteData } from './data';
import { expect, describe, it, vi } from 'vitest';

/**
 * data
 */

const results = [
  { id: 32, date: '2022-10-05', content: '일정 32' },
  { id: 28, date: '2022-08-25', content: '일정 28' },
];
const totalCount = 50;

/**
 * mocking
 */

vi.mock('./data', () => {
  return {
    getData: () => Promise.resolve(results),
    getCount: () => totalCount,
    postData: () => results[0],
    putData: () => results[0],
    deleteData: () => true,
  };
});

/**
 * 각 함수 테스트
 */

describe('getData: 데이터 가져오기', () => {
  it('정상적인 경우', () => {
    return expect(getData(1, 'id', 4)).resolves.toEqual(results);
  });
});

describe('getCount: 데이터 개수 가져오기', () => {
  it('정상적인 경우', () => {
    expect(getCount()).toBe(totalCount);
  });
});

describe('postData: 데이터 추가하기', () => {
  it('정상적인 경우', () => {
    const dataToBeSent = { date: '2022-10-05', content: '일정 32' };
    expect(postData(dataToBeSent)).toEqual(results[0]);
  });
});

describe('putData: 데이터 수정하기', () => {
  it('정상적인 경우', () => {
    const dataToBeSent = { date: '2022-10-05', content: '일정 32' };
    expect(putData(1, dataToBeSent)).toEqual(results[0]);
  });
});

describe('deleteData: 데이터 삭제하기', () => {
  it('정상적인 경우', () => {
    expect(deleteData(1)).toBe(true);
  });
});
