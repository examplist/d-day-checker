import { getCount, getData, postData, putData, deleteData } from './data';
// vi의 경우 글로벌로 가져와야 한다.
import { expect, describe, it } from './node_modules/vitest/dist/index.js';

const resultArray = [
  { id: 32, date: '2022-10-05', content: '일정 32' },
  { id: 28, date: '2022-08-25', content: '일정 28' },
];
const totalCount = 50;

vi.mock('./data', () => {
  return {
    getData: (page: number, sort: string, limit: number) => {
      return Promise.resolve(resultArray);
    },
    getCount: () => totalCount,
    postData: (dataToBeSent) => resultArray[0],
    putData: (id, dataToBeSent) => resultArray[0],
    deleteData: (id) => true,
  };
});

describe('getData: 데이터 가져오기', () => {
  it('정상적인 경우', () => {
    return expect(getData(1, 'id', 4)).resolves.toEqual(resultArray);
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
    expect(postData(dataToBeSent)).toEqual(resultArray[0]);
  });
});

describe('putData: 데이터 수정하기', () => {
  it('정상적인 경우', () => {
    const dataToBeSent = { date: '2022-10-05', content: '일정 32' };
    expect(putData(1, dataToBeSent)).toEqual(resultArray[0]);
  });
});

describe('deleteData: 데이터 삭제하기', () => {
  it('정상적인 경우', () => {
    expect(deleteData(1)).toBe(true);
  });
});
