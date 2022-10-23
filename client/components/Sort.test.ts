import { expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';

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

vi.stubGlobal('document', new Window().document);
vi.mock('../data', () => {
  return {
    getData: () => Promise.resolve(results),
    getCount: () => totalCount,
    putData: () => results[0],
    deleteData: () => true,
  };
});

/**
 * Sort 컴포넌트
 */

import $sort from './Sort';

it('$sort에 있는 버튼들 종류 및 순서 확인하기', () => {
  expect($sort.children[0].textContent).toBe('작성순');
  expect($sort.children[1].textContent).toBe('날짜순');
});
